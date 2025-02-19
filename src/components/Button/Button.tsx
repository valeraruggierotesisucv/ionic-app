import React from 'react';
import { IonButton, IonLabel } from '@ionic/react';
import './button.css'; 

export enum ButtonSize {
  EXTRA_SMALL = "extraSmall",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum ButtonVariant {
  PRIMARY = "primary",
}

interface ButtonProps {
  label: string;
  onClick?: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  style?: React.CSSProperties;
  fontSize?: number;
  disabled?: boolean;
}

export function Button({
  label,
  onClick,
  size = ButtonSize.MEDIUM,
  variant = ButtonVariant.PRIMARY,
  fontSize = 17,
  style,
  disabled = false,
}: ButtonProps) {
  return (
    <IonButton
      className={`${size} ${variant} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      color={'#050F71'}
      size={
        size === ButtonSize.EXTRA_SMALL || size === ButtonSize.SMALL  
        ? 'small'
        : (size === ButtonSize.LARGE)
          ? 'large'
          : 'default'
      }
      style={{ ...style, fontSize }}
    >
      <IonLabel>{label}</IonLabel>
    </IonButton>
  );
}

