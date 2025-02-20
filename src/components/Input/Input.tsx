import React from 'react';
import { IonLabel, IonInput, IonTextarea, IonIcon } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';
import "./input.css"; 

export enum InputVariant {
  DEFAULT = 'default',
  ARROW = 'arrow',
}

interface InputProps {
  label: string;
  placeholder?: string;
  multiline?: boolean;
  variant?: InputVariant;
  required?: boolean;
  onPress?: () => void;
  value?: string;
  onChangeValue?: (data: string) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  variant = InputVariant.DEFAULT,
  multiline = true,
  required = true,
  onPress,
  value,
  onChangeValue,
}) => {
  return (
    <div onClick={onPress} className="input-container">
      <IonLabel className="label" style={{ flex: placeholder ? 0.45 : 1 }}>
        {label}{' '}
        {required && <span className="required">*</span>}
      </IonLabel>

      {variant === InputVariant.DEFAULT ? (
        multiline ? (
          <IonTextarea
            value={value}
            placeholder={placeholder}
            onIonInput={(e: any) => onChangeValue && onChangeValue(e.target.value)}
            className="placeholder"
          />
        ) : (
          <IonInput
            value={value}
            placeholder={placeholder}
            onIonInput={(e: any) => onChangeValue && onChangeValue(e.target.value)}
            className="placeholder"
          />
        )
      ) : (
        placeholder && <span className="placeholder">{placeholder}</span>
      )}

      {variant === InputVariant.ARROW && (
        <IonIcon icon={chevronForwardOutline} size="large" color="medium" />
      )}
    </div>
  );
};

export default Input;
