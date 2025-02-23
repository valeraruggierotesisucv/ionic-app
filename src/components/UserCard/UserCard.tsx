import React from 'react';
import { IonRow, IonCol, IonText, IonAvatar } from '@ionic/react';
import { Button, ButtonSize } from '../Button/Button';
import './userCard.css'; 

export enum UserCardVariant {
  DEFAULT = "default",
  WITH_BUTTON = "withButton",
}

export interface UserCardProps {
  profileImage: string;
  username: string;
  variant?: UserCardVariant;
  onPressUser?: () => void;
  onPressButton?: () => void;
  actionLabel?: string;
  disabled?: boolean;
}

export function UserCard({
  profileImage,
  username,
  variant = UserCardVariant.DEFAULT,
  onPressUser,
  onPressButton,
  actionLabel,
  disabled,
}: UserCardProps) {
  return (
    <IonRow className="user-card-container ion-align-items-center" onClick={onPressUser}>
      <IonCol size="auto" className="ion-no-padding">
        <IonAvatar className="user-avatar">
          <img src={profileImage} alt="Profile" />
        </IonAvatar>
      </IonCol>
      
      <IonCol className="ion-padding-start">
        <IonText className="username">
          {username}
        </IonText>
      </IonCol>
      
      {variant === UserCardVariant.WITH_BUTTON && (
        <IonCol size="auto" className="ion-no-padding">
          <Button 
            size={ButtonSize.EXTRA_SMALL}
            onClick={onPressButton}
            disabled={disabled}
            label={actionLabel || "Action"}            
          />
        </IonCol>
      )}
    </IonRow>   
  );
}
