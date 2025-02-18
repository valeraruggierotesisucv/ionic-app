import React from 'react';
import { 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonText
} from '@ionic/react';
import { ROUTES } from '../utils/routes';
import { NavigationService } from '../services/NavigationService';
import NotificationItem from '../components/NotificationItem/NotificationItem';
import { NotificationType } from '../components/NotificationItem/NotificationItem';

const Tab1Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>
          <h1>Welcome to Home</h1>
        </IonText>
        <IonButton 
          expand="block"
          routerLink={NavigationService.goToHomeDetail()} 
          routerDirection="forward"
        >
          Go to Detail
        </IonButton>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1Home; 