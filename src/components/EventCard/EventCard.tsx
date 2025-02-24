import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonRow, IonCol, IonText, IonButton, IonImg } from '@ionic/react';
import { SocialInteractions } from "../SocialInteractions/SocialInteractions";
import { UserCard, UserCardVariant } from "../UserCard/UserCard";
import './eventCard.css'; 
import { Chip, ChipVariant } from '../Chip/Chip';
import { useTranslation } from 'react-i18next';
import { CommentsSection } from '../CommentsSection/CommentsSection';
import { DisplayInput } from "../DisplayInput/DisplayInput";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { ShareEventController } from '../../controllers/ShareEventController';
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

interface PillsProps {
  startsAt: string;
  endsAt: string;
  date: string;
}

interface LocationPillsProps {
  latitude: string;
  longitude: string;
}

interface DisplayEventProps {
  latitude?: string;
  longitude?: string;
  startsAt?: string;
  endsAt?: string;
  date?: string;
  category?: string;
  musicUrl?: string;
}

const Pills = ({ startsAt, endsAt, date }: PillsProps) => {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <Chip label={startsAt} variant={ChipVariant.LIGHT} />
      <Chip label={endsAt} variant={ChipVariant.LIGHT} />
      <Chip label={date} variant={ChipVariant.LIGHT} />
    </div>
  );
};

const LocationPills = ({ latitude, longitude }: LocationPillsProps) => {
  const lat = parseFloat(latitude).toFixed(3);
  const long = parseFloat(longitude).toFixed(3);
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <Chip label={lat} variant={ChipVariant.LIGHT} />
      <Chip label={long} variant={ChipVariant.LIGHT} />
    </div>
  );
};

export function DisplayEvent({
  latitude,
  longitude,
  startsAt,
  endsAt,
  date,
  category,
  musicUrl,
}: DisplayEventProps) {
  const { t } = useTranslation();

  return (
    <div>
      {musicUrl && <AudioPlayer uri={musicUrl} />}
      <DisplayInput
        label={t("common.location").toUpperCase()}
        data={<LocationPills latitude={latitude || ""} longitude={longitude || ""} />}
      />

      <DisplayInput
        label={t("common.when").toUpperCase()}
        data={
          <Pills
            startsAt={startsAt || ""}
            endsAt={endsAt || ""}
            date={date || ""}
          />
        }
      />

      <DisplayInput
        label={t("common.category").toUpperCase()}
        data={<Chip label={category || ""} variant={ChipVariant.LIGHT} />}
      />
    </div>
  );
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
  onMoreDetails,
  fetchComments,
  musicUrl,
  handleLike,
}: EventCardProps) {
  const { t } = useTranslation();
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const onShare = async () => {
    await ShareEventController.shareEvent(t("common.share_message", {eventName: title, eventDate: date.toString()}));
  }
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
    <IonRow className='event-card-container'>
        <UserCard
          profileImage={profileImage}
          username={username}
          variant={UserCardVariant.DEFAULT}
          onPressUser={onPressUser}
        />
        <IonImg src={eventImage} alt="Event" className='image'  />
        
        
        <div className='content-container'>
        <SocialInteractions
          isLiked={isLiked}
          onLike={handleLike}
          onComment={() => setCommentsVisible(true)}
          onShare={onShare}
        />
        <div className="title-row">
          <IonCol size="9" className='title-col'>
            <h1 className='title'>{title}</h1>
          </IonCol>
          {variant === "default" && (
            <IonCol className="ion-text-right" size='3'>
              <Chip label={date} variant={ChipVariant.LIGHT} />
            </IonCol>
          )}
          
        </div>
        <p className="description-text">
          <p>{description}</p>
        </p>
        {variant === "default" && onMoreDetails && (
        <div className="button-containers">
          <IonButton fill="clear" onClick={onMoreDetails} className='more-details'>
              <IonText className='more-details-text'>{t("common.see_more_details")}</IonText>
          </IonButton>
        </div>
        )}
        {variant === "details" && (
          <DisplayEvent
            latitude={latitude}
            longitude={longitude}
            startsAt={startsAt}
            endsAt={endsAt}
            date={date}
            category={category}
            musicUrl={musicUrl}
          />
        )}
        {commentsVisible && comments && (
          <CommentsSection
            comments={comments}
            onAddComment={handleAddComment}
            isOpen={commentsVisible}
            setIsOpen={setCommentsVisible}
          />
        )}
        </div>
    </IonRow>         
  );
}
