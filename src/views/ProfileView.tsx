import { IonContent } from "@ionic/react";

import { IonPage, IonToolbar } from "@ionic/react";

import { IonHeader } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { ProfileCard } from "../components/ProfileCard/ProfileCard";
import { EventThumbnail, EventThumbnailList } from "../components/EventThumbnailList/EventThumbnailList";
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../utils/routes';

const events: EventThumbnail[] = [
    {
        id: "1",
        imageUrl: "https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg",
    },
    {
        id: "2",
        imageUrl: "https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg",
    },
    {
        id: "3",
        imageUrl: "https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg",
    },
    {
        id: "4",
        imageUrl: "https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg",
    },
    {
        id: "5",
        imageUrl: "https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg",
    },
    {
        id: "6",
        imageUrl: "https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg",
    },
    {
        id: "7",
        imageUrl: "https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg",
    },
    {
        id: "8",
        imageUrl: "https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg",
    },
    {
        id: "9",
        imageUrl: "https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg",
    },
    {
        id: "10",
        imageUrl: "https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg",
    },
    {
        id: "11",
        imageUrl: "https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg",
    },
    {
        id: "12",
        imageUrl: "https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg",
    },
    {
        id: "13",
        imageUrl: "https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg",
    },
    {
        id: "14",
        imageUrl: "https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg",
    },
];

export function ProfileView() {
  const history = useHistory();

  const handleEditProfile = () => {
    history.push(ROUTES.PROFILE.EDIT);
  };

  return (
    <IonPage>
      <AppHeader />

      <IonContent >
        <ProfileCard 
            username="John Doe"
            biography="I am a software engineer"
            events={10}
            followers={100}
            following={100}
            onEditProfile={handleEditProfile}
            onConfigureProfile={() => {console.log("Configure profile")}}
        />

        <EventThumbnailList
            events={events}
            onPressEvent={(id) => {console.log("Event pressed", id)}}
        />
      
        
        
      </IonContent>
    </IonPage>
  );
}
