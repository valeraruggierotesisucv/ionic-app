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
import { CommentInput } from '../components/CommentInput/CommentInput';
import { InputField } from '../components/InputField/InputField';
import { DateTimePickerField } from '../components/DateTimePickerField/DateTimePickerField';

import { Button, ButtonSize, ButtonVariant } from '../components/Button/Button';
import { UserCard, UserCardVariant } from '../components/UserCard/UserCard';

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
        <DateTimePickerField label="Date" value={new Date()} onChange={() => {}} />
        <SearchBar
          value=""
          onChange={() => {}}
        />
        <CommentInput onSend={() => {console.log('clicked')}} />
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
        <Button 
          label='Boton'
          disabled={false}
          onClick={() => console.log("CLICK")}  
          variant={ButtonVariant.PRIMARY}      
          size={ButtonSize.SMALL}  
        />
        <UserCard
          profileImage='https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//defaultProfile.jpg'
          username='Joe'
          variant={UserCardVariant.WITH_BUTTON}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1Home; 