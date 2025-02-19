import React, { useState } from 'react';
import { 
  IonButton,
  IonContent, 
  IonHeader, 
  IonImg, 
  IonPage, 
  IonToolbar,
  IonText
} from '@ionic/react';
import { NavigationService } from '../services/NavigationService';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { AudioPlayer } from '../components/AudioPlayer/AudioPlayer';
import { logoIonic } from 'ionicons/icons';
import { CategoryButton } from '../components/CategoryButton/CategoryButton';
import { CommentInput } from '../components/CommentInput/CommentInput';
import { DateTimePickerField } from '../components/DateTimePickerField/DateTimePickerField';
import { CommentItem } from '../components/CommentItem/CommentItem';
import { CommentsSection, Comment } from '../components/CommentsSection/CommentsSection';

const Tab1Home: React.FC = () => {
  const [selected, setSelected] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      username: "Usuario1",
      comment: "¡Gran evento!",
      timestamp: new Date(),
      profileImage: "https://picsum.photos/50/50"
    },
    {
      username: "Usuario2",
      comment: "Me encantó",
      timestamp: new Date(),
      profileImage: "https://picsum.photos/50/50"
    }
  ]);

  const handleAddComment = (comment: string) => {
    const newComment: Comment = {
      username: "Usuario",  // Aquí deberías usar el username del usuario actual
      comment: comment,
      timestamp: new Date(),
      profileImage: "https://picsum.photos/50/50"  // Aquí deberías usar el avatar del usuario actual
    };
    setComments([...comments, newComment]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <AppHeader title="Home" />
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonButton onClick={() => setShowComments(true)}>
          Ver comentarios
        </IonButton>


        <CommentsSection
          comments={comments}
          isOpen={showComments}
          setIsOpen={setShowComments}
          onAddComment={handleAddComment}
        />

      </IonContent>
    </IonPage>
  );
};

export default Tab1Home; 