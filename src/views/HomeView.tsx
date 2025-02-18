import React, { useState } from 'react';
import { 
  IonButton,
  IonContent, 
  IonHeader, 
  IonImg, 
  IonPage, 
  IonToolbar,
  IonText
} from '@ionic/react';
import { NavigationService } from '../services/NavigationService';
import { SearchBar } from '../components/SearchBar/SearchBar';
import NotificationItem from '../components/NotificationItem/NotificationItem';
import { NotificationType } from '../components/NotificationItem/NotificationItem';
import { useAuth } from '../contexts/AuthContext';


const Tab1Home: React.FC = () => {
  const { user } = useAuth(); 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <AppHeader title="Home" />
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonButton onClick={() => setShowComments(true)}>
          Ver comentarios
        </IonButton>

        <IonButton 
          expand="block"
          routerLink={"/login"} 
          routerDirection="forward"
        >
          Go Login
        </IonButton>
        
      </IonContent>
      <IonText>
        {user?.email}
      </IonText>
    </IonPage>
  );
};

export default Tab1Home; 