import { IonIcon, IonButton } from '@ionic/react';
import { heartOutline, heartSharp, chatbubbleEllipsesOutline, paperPlaneOutline } from 'ionicons/icons';
import './socialInteractions.css'; 

interface SocialInteractionsProps {
  isLiked: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

export function SocialInteractions({
  isLiked,
  onLike,
  onComment,
  onShare,
}: SocialInteractionsProps) {
  return (
    <div className="social-interactions-container">
      <IonButton fill="clear" onClick={onLike} className='custom-button'>
        <IonIcon icon={isLiked ? heartSharp : heartOutline} size="medium" color='dark'/>
      </IonButton>

      <IonButton fill="clear" onClick={onComment} className='custom-button'>
        <IonIcon icon={chatbubbleEllipsesOutline} size="medium" color='dark'/>
      </IonButton>

      <IonButton fill="clear" onClick={onShare} className='custom-button'>
        <IonIcon icon={paperPlaneOutline} size="medium" color='dark' />
      </IonButton>
    </div>
  );
}
