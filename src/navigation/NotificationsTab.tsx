import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import NotificationItem, { NotificationType } from '../components/NotificationItem/NotificationItem';
import { NotificationsView } from '../views/NotificationsView';


const NotificationsTab: React.FC = () => {
  return (
    <NotificationsView />
  );
};

export default NotificationsTab; 