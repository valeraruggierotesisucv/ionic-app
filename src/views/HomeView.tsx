import React, { useState } from 'react';
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
import { SearchBar } from '../components/SearchBar/SearchBar';
import NotificationItem from '../components/NotificationItem/NotificationItem';
import { NotificationType } from '../components/NotificationItem/NotificationItem';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { AudioPlayer } from '../components/AudioPlayer/AudioPlayer';
import { logoIonic } from 'ionicons/icons';
import { CategoryButton } from '../components/CategoryButton/CategoryButton';


const Tab1Home: React.FC = () => {
  const [selected, setSelected] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <AppHeader title="Home" />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        <SearchBar
          value=""
          onChange={() => {}}
        />
        <IonText>
          <h1>Welcome to Home</h1>
        </IonText>
        <AudioPlayer uri="https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/EventMusic//1736911434515" />
        <CategoryButton label="Category" icon={logoIonic} onPress={() => {setSelected(!selected)}} selected={selected} />
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