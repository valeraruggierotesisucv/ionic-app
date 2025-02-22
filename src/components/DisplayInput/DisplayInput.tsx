import React from 'react';
import { IonItem, IonLabel, IonText } from '@ionic/react';
import './displayInput.css'; 

interface DisplayInputProps {
  label: string;
  onPress?: () => void;
  data?: React.ReactNode;
}

export const DisplayInput: React.FC<DisplayInputProps> = ({ label, onPress, data }) => {
  return (
    <div className="display-input-container" onClick={onPress}>
      <IonLabel className="display-input-label" >
        {label}
      </IonLabel>
      <div className="display-input-data">
        {data}
      </div>
    </div>
  );
};
