import React from 'react';
import { IonItem, IonLabel, IonText } from '@ionic/react';
import './displayInput.css'; 

interface DisplayInputProps {
  label: string;
  data: React.ReactNode;
}

export const DisplayInput: React.FC<DisplayInputProps> = ({ label, data }) => {
  return (
    <IonItem lines="full" className="display-input-container">
      <IonLabel className="display-input-label" >
        {label}
      </IonLabel>
      <div className="display-input-data">
        {data}
      </div>
    </IonItem>
  );
};
