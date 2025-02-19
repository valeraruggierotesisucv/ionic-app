import { IonModal, IonContent } from '@ionic/react';
import { CommentItem } from '../CommentItem/CommentItem';
import { CommentInput } from '../CommentInput/CommentInput';
import './CommentsSection.css';

export interface Comment {
  username: string;
  comment: string;
  timestamp: Date;
  profileImage?: string;
}

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment?: (comment: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function CommentsSection({
  comments,
  onAddComment,
  isOpen,
  setIsOpen,
}: CommentsSectionProps) {
  return (
    <IonModal 
      isOpen={isOpen} 
      onDidDismiss={() => setIsOpen(false)}
      breakpoints={[0,1]}
      initialBreakpoint={1}
      className="comments-modal"
    >
      <div className="comments-container">
        <div className="comments-header">
          <h2>Comentarios</h2>
        </div>

        <div className="comments-scroll-container">
          {comments.map((comment, index) => (
            <CommentItem
              key={index}
              username={comment.username}
              comment={comment.comment}
              timestamp={comment.timestamp}
              userAvatar={comment.profileImage}
            />
          ))}
        </div>

        <div className="input-container">
          <CommentInput onSend={onAddComment || (() => {})} />
        </div>
      </div>
    </IonModal>
  );
}
