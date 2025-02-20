import React from 'react';
import { IonItem, IonLabel, IonText } from '@ionic/react';
import './displayInput.css'; 

interface DisplayInputProps {
  label: string;
  onPress: () => void;
}

export const DisplayInput: React.FC<DisplayInputProps> = ({ label, onPress }) => {
  return (
    <div className="display-input-container">
      <IonLabel className="display-input-label" >
        {label}
      </IonLabel>
      <div className="display-input-data">
        {data}
      </div>
    </div>
  );
};
