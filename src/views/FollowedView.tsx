import { IonContent, IonList, IonPage, IonAlert } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useHistory } from "react-router-dom";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { UserCard, UserCardVariant } from "../components/UserCard/UserCard";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ListUsersController } from "../controllers/ListUsersController";
import { useAuth } from "../contexts/AuthContext";
import { FollowUserController } from "../controllers/FollowUserController";

interface Followed {
  followedId: string;
  followedName: string;
  followedProfileImage: string;
  followed: boolean;
}

export function FollowedView() {
  const { t } = useTranslation();
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [followed, setFollowed] = useState<Followed[] | null>(null);
  const { user, session } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const getFollowed = async () => {
    try {
      if (!session) return;
      const response = await ListUsersController.getFollowed(
        session?.access_token, 
        user!.id
      );
      setFollowed(response);
    } catch (error) {
      console.error("Error in getFollowed:", error);
      setAlertMessage((error as Error).message);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    getFollowed();
  }, []);

  const handleUnfollow = async (userId: string) => {
    if (!session) return;
    try {
      const response = await FollowUserController.unfollowUser(
        session?.access_token, 
        user!.id, 
        userId
      );
      if (response.success) {
        getFollowed();
      }
    } catch (error) {
      console.error("Error in handleUnfollow:", error);
      setAlertMessage((error as Error).message);
      setShowAlert(true);
    }
  };

  const filteredFollowed = followed?.filter((follow) =>
    follow.followedName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <IonPage>
      <AppHeader title={t("profile.followed")} goBack={() => history.goBack()} />
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Error"
        message={alertMessage}
        buttons={["OK"]}
      />
      <IonContent className="ion-padding">
        <SearchBar
          placeholder={t("search.title")}
          onChange={setSearch}
          value={search}
        />
        <IonList>
          {filteredFollowed?.map((followed) => (
            <UserCard
              key={followed.followedId}
              username={followed.followedName}
              profileImage={followed.followedProfileImage}
              variant={UserCardVariant.WITH_BUTTON}
              actionLabel={t("common.unfollow")}
              onPressButton={() => handleUnfollow(followed.followedId)}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
