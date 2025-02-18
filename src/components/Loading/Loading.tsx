import React from 'react';
import { IonContent, IonRow, IonSpinner, IonText } from '@ionic/react';
import './loading.css';  // Asumimos que los estilos estarán en este archivo

export function Loading() {
  //const { t } = useTranslation();
  
  return (
    <IonRow className='loading-container'>
        <IonSpinner name="crescent" color="primary" />
        <IonText className="loading-text">loading</IonText>
    </IonRow>     

  );
}
