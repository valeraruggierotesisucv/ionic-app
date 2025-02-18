import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import NotificationItem, { NotificationType } from '../components/NotificationItem/NotificationItem';


const NotificationsTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <NotificationItem 
          timestamp={new Date()}
          type={NotificationType.COMMENT_EVENT}
          user='joe'
          userAvatar='https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//defaultProfile.jpg'
          eventImage='https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//defaultImage.jpg'
        />
      </IonContent>
    </IonPage>
  );
};

export default NotificationsTab; 