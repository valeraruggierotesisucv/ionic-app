import { IonContent } from "@ionic/react";

import { IonPage, IonToolbar } from "@ionic/react";

import { IonHeader } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { ProfileCard } from "../components/ProfileCard/ProfileCard";
import { EventThumbnail, EventThumbnailList } from "../components/EventThumbnailList/EventThumbnailList";

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
];

export function ProfileView() {
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
        />

        <EventThumbnailList
            events={events}
            onPressEvent={(id) => {console.log("Event pressed", id)}}
        />
      
        
        
      </IonContent>
    </IonPage>
  );
}
