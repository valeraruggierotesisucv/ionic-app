import { IonAvatar, IonButton, IonImg, IonText, IonRow, IonCol, IonRippleEffect } from '@ionic/react';
import './notificationItem.css'; 
import { formatDate } from '../../utils/formatDate';
import { useTranslation } from 'react-i18next';

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
  isNew: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  user,
  userAvatar,
  timestamp,
  type,
  eventImage,
  onFollow,
  isNew
}) => {
  const { t, i18n } = useTranslation();
  const formattedDate = formatDate(timestamp, i18n.language);

  return (
    <IonRow className={`notification-container ion-activatable ${isNew ? 'new' : ''}`}>
      <IonRippleEffect />
      
      <IonCol size="2" className="notification-avatar">
        
          <img src={userAvatar} alt="User Avatar" className="avatar-image" />
        
      </IonCol>

      <IonCol size="7" className="notification-content">
        <div className="notification-header">
          <IonText className="notification-title">{user}</IonText>
          <IonText className="notification-timestamp">{formattedDate}</IonText>
        </div>
        <IonText className="notification-description">
          {i18n.t(notificationMessages[type])}
        </IonText>
      </IonCol>

      <IonCol size="3" className="notification-actions">
        {(type === NotificationType.LIKE_EVENT || type === NotificationType.COMMENT_EVENT) && eventImage && (
          <img src={eventImage} alt="Event Image" className="event-image" />
        )}
        {type === NotificationType.FOLLOW && onFollow && (
          <IonButton 
            fill="clear" 
            size="small"
            onClick={onFollow}
          >
            {i18n.t('common.follow')}
          </IonButton>
        )}
      </IonCol>
    </IonRow>
  );
};

export default NotificationItem;
