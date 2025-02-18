import React from 'react';
import { IonChip, IonLabel } from '@ionic/react';
import './Chip.css';

export enum ChipVariant {
  DEFAULT = "default",
  LIGHT = "light",
}

interface ChipProps {
  label: string;
  onPress?: () => void;
  variant: ChipVariant;
}

export function Chip({
  label,
  onPress,
  variant = ChipVariant.DEFAULT,
}: ChipProps) {
  return (
    <IonChip onClick={onPress} className={`ion-chip ${variant}`}>
      <IonLabel className='ion-label'>{label}</IonLabel>
    </IonChip>
  );
}
