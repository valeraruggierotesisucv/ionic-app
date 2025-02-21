import React, {  } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonToolbar,
  IonText
} from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { EventCard } from '../components/EventCard/EventCard';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../utils/routes';


const events = [
  {
    id: '1',
  },
  {
    id: '2',
  },
  {
    id: '3',
  },
  {
    id: '4',
  },
  {
    id: '5',
  },
  {
    id: '6',
  },
  {
    id: '7',
  },
  {
    id: '8',
  },
  {
    id: '9',
  },
  {
    id: '10',
  },
  {
    id: '11',
  },
  {
    id: '12',
  },
  {
    id: '13',
  },
  {
    id: '14',
  },
  {
    id: '15',
  },
  {
    id: '16',
  },

]

export const HomeView: React.FC = () => {
  const { user } = useAuth(); 
  const history = useHistory();
  return (
    <IonPage>
      <AppHeader />
      <IonContent className="">
      {events.map((event) => (
        <EventCard 
          key={event.id}
          date='10/02/2021'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
          eventId='1'
          eventImage='https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg'
          isLiked={true}
          profileImage='https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg'
          endsAt='8:00 pm'
          latitude='264554'
          category='CONCIERTO'
          username='joe'
          musicUrl='https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//EventsMusic.mp3'
          startsAt='6:00 pm'
          title='ESTE ES EL TITULO'
          handleLike={() => console.log("")}
          onShare={() => console.log("")}
          onComment={async() => console.log("")}
          onPressUser={() => console.log("")}
          onMoreDetails={() => history.push(ROUTES.HOME.EVENT_DETAILS)}   
          userComment={{
            username: 'joe',
            profileImage: 'https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//defaultProfile.jpg',
          }}
          fetchComments={() => Promise.resolve([])}
        />
      ))}
      <IonText>
        {user?.email}
      </IonText>
      </IonContent>
    </IonPage>
  );
};

