import { IonContent, useIonViewWillEnter } from "@ionic/react";
import { IonPage } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { ProfileCard } from "../components/ProfileCard/ProfileCard";
import { EventThumbnail, EventThumbnailList } from "../components/EventThumbnailList/EventThumbnailList";
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import { useEffect, useState } from "react";
import UserModel from "../models/UserModel";
import { ProfileController } from "../controllers/ProfileController";
import { useAuth } from "../contexts/AuthContext";
import { Loading } from "../components/Loading/Loading";

export interface EventSummary {
    id: string;
    imageUrl: string;
}

export function ProfileView() {
  const history = useHistory();
  const [user, setUser] = useState<UserModel | null>(null);
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {session, user: authUser} = useAuth();

  const fetchProfile = async () => {
    try{
      if(!session) return;
      const user = await ProfileController.getProfile(
        session?.access_token, 
        authUser?.id || ""
      );
      setUser(user);
      const events = await ProfileController.getUserEvents(
        session?.access_token, 
        authUser?.id || ""
      );
      setEvents(events);
      setIsLoading(false);
    }catch(error){
      console.error("Error in fetchProfile:", error);
    }
  };
  useIonViewWillEnter(() => {
    fetchProfile();
  });

  const handleEditProfile = () => {
    history.push(ROUTES.PROFILE.EDIT);
  };

  const handleConfigureProfile = () => {
    history.push(ROUTES.PROFILE.CONFIGURATION);
  };

  const handleFollowers = () => {
    history.push(ROUTES.PROFILE.FOLLOWERS);
  };

  const handleFollowed = () => {
    history.push(ROUTES.PROFILE.FOLLOWED);
  };

  return (
    <IonPage>
      <AppHeader />

      <IonContent >
        {isLoading ? (
          <Loading/>
        ) : (
          <>
        <ProfileCard 
            username={user?.username || ""}
            biography={user?.biography || ""}
            profileImage={user?.profileImage || ""}
            events={events.length}
            followers={user?.followersCounter || 0}
            following={user?.followingCounter || 0}
            onEditProfile={handleEditProfile}
            onConfigureProfile={handleConfigureProfile}
            onFollowers={handleFollowers}
            onFollowed={handleFollowed}
        />

        <EventThumbnailList
            events={events}
            onPressEvent={(id) => {history.push(ROUTES.PROFILE.EVENT_DETAILS.replace(":eventId", id), { canEdit: true })}}
        />
        </>
        )}
      </IonContent>
    </IonPage>
  );
}
