import React from 'react';
import { IonCard, IonCardContent, IonRow, IonCol, IonText, IonButton, IonAvatar } from '@ionic/react';
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
    <IonRow className="ion-align-items-center" >
        <IonCol size="auto" >
            <IonAvatar>
                <img src={profileImage} alt="Profile" />
            </IonAvatar>
        </IonCol>
        <IonCol >
            <IonText className='username'>
                {username}
            </IonText>
        </IonCol>
        {variant === UserCardVariant.WITH_BUTTON && (
        <IonCol className="ion-text-right"  style={{ width: '100%' }}>
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
