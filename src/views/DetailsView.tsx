import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { NavigationService } from '../services/NavigationService';

const Tab1Detail: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton 
          expand="block"
          routerLink={NavigationService.goToHome()} 
          routerDirection="back"
        >
          Go to Home
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1Detail; 