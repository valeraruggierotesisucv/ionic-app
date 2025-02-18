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
import { SocialInteractions } from '../components/SocialInteractions/SocialInteractions';
import { EventCard } from '../components/EventCard/EventCard';
import { Chip, ChipVariant } from '../components/Chip/Chip';
import { Loading } from '../components/Loading/Loading';

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
        { /*
        <UserCard
          profileImage='https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//defaultProfile.jpg'
          username='Joe'
          variant={UserCardVariant.WITH_BUTTON}
        />
        */}       
        
        <EventCard 
          date='10/02/2021'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
          eventId='1'
          eventImage='https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//defaultImage.jpg'
          isLiked={true}
          profileImage='https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//defaultProfile.jpg'
          endsAt='8:00 pm'
          latitude='264554'
          longitude='4578787'
          category='CONCIERTO'
          username='joe'
          musicUrl='https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//EventsMusic.mp3'
          startsAt='6:00 pm'
          title='ESTE ES EL TITULO'
          handleLike={() => console.log("")}
          onShare={() => console.log("")}
          onComment={async() => console.log("")}
          onPressUser={() => console.log("")}
          onMoreDetails={() => console.log("")}          
        />
        <Loading />
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1Home; 