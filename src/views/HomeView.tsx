import React, {  } from 'react';
import { 
  IonButton,
  IonContent, 
  IonHeader, 
  IonPage, 
  IonToolbar,
  IonText
} from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import { AppHeader } from '../components/AppHeader/AppHeader';


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

      <IonText>
        {user?.email}
      </IonText>
        
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1Home; 