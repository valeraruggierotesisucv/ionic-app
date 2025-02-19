import React, { useState } from 'react';
import { 
  IonButton,
  IonContent, 
  IonHeader, 
  IonImg, 
  IonPage, 
  IonTitle, 
  IonToolbar,
} from '@ionic/react';
import { EventThumbnailList } from '../components/EventThumbnailList/EventThumbnailList';
import { Calendar } from '../components/Calendar/Calendar';
import { IconLogo } from '../components/IconLogo/IconLogo';
import { Modal } from '../components/Modal/Modal';
import Success from '../assets/images/Success.png';

const dummyEvents = [
  {
    id: '1',
    imageUrl: 'https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg',
  },
  {
    id: '2',
    imageUrl: 'https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg',
  },
  {
    id: '3',
    imageUrl: 'https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg',
  },
  {
    id: '4',
    imageUrl: 'https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg',
  },
  {
    id: '5',
    imageUrl: 'https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg',
  },
  {
    id: '6',
    imageUrl: 'https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg',
  },
  {
    id: '7',
    imageUrl: 'https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg',
  },
  {
    id: '8',
    imageUrl: 'https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg',
  },
  
];

const Tab1Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
      <IonButton onClick={() => setIsModalOpen(true)}>Publicar evento</IonButton>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p style={{color: 'black'}}>Tu evento se ha publicado con exito!</p>
        <IonImg src={Success} style={{ width: 200, height: 200 }} />
      </Modal>
        <Calendar
          date={new Date()}
          onDateChange={() => {}}
          onStartTimeChange={() => {}}
          onEndTimeChange={() => {}}
        />
        <EventThumbnailList
          events={dummyEvents}
          onPressEvent={(id) => {
            console.log(id)
          }}
        />
        <IconLogo />
      </IonContent>
    </IonPage>
  );
};

export default Tab1Home; 