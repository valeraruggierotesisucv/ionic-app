import { IonAvatar, IonButton, IonImg, IonText, IonRow, IonCol } from '@ionic/react';
import './notificationItem.css'; 

export enum NotificationType {
  FOLLOW = 'FOLLOW',
  LIKE_EVENT = 'LIKE',
  COMMENT_EVENT = 'COMMENT',
}

const notificationMessages = {
  [NotificationType.FOLLOW]: 'notifications.FOLLOW',
  [NotificationType.LIKE_EVENT]: 'notifications.LIKE',
  [NotificationType.COMMENT_EVENT]: 'notifications.COMMENT',
};

export interface NotificationItemProps {
  user: string;
  userAvatar: string;
  timestamp: Date;
  type: NotificationType;
  eventImage?: string;
  onFollow?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  user,
  userAvatar,
  timestamp,
  type,
  eventImage,
  onFollow,
}) => {
  //const { t, i18n } = useTranslation();
  //const formattedDate = formatDate(timestamp, i18n.language);

  return (
    <IonRow className="notification-container">
      <IonCol size="2" className="notification-avatar">
        <IonAvatar>
          <img src={userAvatar} alt="User Avatar" className="avatar-image" />
        </IonAvatar>
      </IonCol>

      <IonCol size="7" className="notification-content">
        <div className="notification-header">
          <IonText className="notification-title">{user}</IonText>
          <IonText className="notification-timestamp">{timestamp.toDateString()}</IonText>
        </div>
        <IonText className="notification-description">{type}</IonText>
      </IonCol>

      <IonCol size="3" className="notification-actions">
        {(type === NotificationType.LIKE_EVENT || type === NotificationType.COMMENT_EVENT) && eventImage && (
          <IonImg src={eventImage} alt="Event Image" className="event-image" />
        )}
      </IonCol>
    </IonRow>
  );
};

export default NotificationItem;
