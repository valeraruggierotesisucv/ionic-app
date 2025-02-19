import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonRow, IonCol, IonText, IonButton, IonImg } from '@ionic/react';
import { SocialInteractions } from "../SocialInteractions/SocialInteractions";
import { UserCard, UserCardVariant } from "../UserCard/UserCard";
import './eventCard.css'; 
import { Chip, ChipVariant } from '../Chip/Chip';
//import { DisplayEvent } from "../DisplayEvent/DisplayEvent";
//import { CommentsSection } from "../CommentsSection/CommentsSection";
//import { Chip, ChipVariant } from "../Chip/Chip";

interface Comment {
    username: string;
    comment: string;
    timestamp: Date;
    profileImage?: string;
}

interface EventCardProps {
  eventId: string;
  profileImage: string;
  username: string;
  eventImage: string;
  title: string;
  description: string;
  isLiked: boolean;
  date: string;
  latitude?: string;
  longitude?: string;
  startsAt?: string;
  category?: string;
  endsAt?: string;
  variant?: "default" | "details";
  musicUrl?: string;
  userComment: { username: string; profileImage: string };
  onPressUser: () => void;
  onComment: (eventId: string, comment: string, eventImage: string) => Promise<void>;
  onShare: () => void;
  onMoreDetails?: () => void;
  fetchComments: () => Promise<Comment[]>;
  handleLike: () => void;
}

export function EventCard({
  eventId,
  profileImage,
  username,
  eventImage,
  title,
  description,
  isLiked,
  date,
  latitude,
  longitude,
  startsAt,
  category,
  endsAt,
  variant = "default",
  userComment,
  onPressUser,
  onComment,
  onShare,
  onMoreDetails,
  fetchComments,
  musicUrl,
  handleLike,
}: EventCardProps) {
  //const { t } = useTranslation();
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const handleAddComment = async (comment: string) => {
    try {
      await onComment(eventId, comment, eventImage);
      setComments([
        ...comments,
        {
          username: userComment.username,
          comment: comment,
          profileImage: userComment.profileImage,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error adding comment", error);
      return;
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetchComments();
        setComments(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (commentsVisible) {
      getComments();
    }
  }, [commentsVisible]);

  return (
    <IonRow className='container'>
        <UserCard
          profileImage={profileImage}
          username={username}
          variant={UserCardVariant.DEFAULT}
          onPressUser={onPressUser}
        />
        <IonImg src={eventImage} alt="Event" className='image' />
        <SocialInteractions
          isLiked={isLiked}
          onLike={handleLike}
          onComment={() => setCommentsVisible(true)}
          onShare={onShare}
        />
        <div className="title-row">
          <IonCol size="9" className='title-col'>
            <IonText className='title'>{title}</IonText>
          </IonCol>
          {variant === "default" && (
            <IonCol className="ion-text-right" size='3'>
              <Chip label={date} variant={ChipVariant.LIGHT} />
            </IonCol>
          )}
          
        </div>
        <IonText className="description-text">
          <p>{description}</p>
        </IonText>
        {variant === "default" && onMoreDetails && (
        <IonButton fill="clear" onClick={onMoreDetails} className='more-details'>
            <IonText>Ver más detalles...</IonText>
        </IonButton>
          
        )}
        {/*variant === "details" && (
          <DisplayEvent
            latitude={latitude}
            longitude={longitude}
            startsAt={startsAt}
            endsAt={endsAt}
            date={date}
            category={category}
            musicUrl={musicUrl}
          />
        )*/}
        {/*commentsVisible && comments && (
          <CommentsSection
            comments={comments}
            onAddComment={handleAddComment}
            isOpen={commentsVisible}
            setIsOpen={setCommentsVisible}
          />
        )*/}
    </IonRow>         
  );
}
