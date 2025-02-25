import React from 'react';
import {  IonRow, IonSpinner, IonText } from '@ionic/react';
import './loading.css'; 
import { useTranslation } from 'react-i18next';

export function Loading() {
  const { t } = useTranslation();
  
  return (
    <IonRow className='loading-container'>
        <IonSpinner name="crescent" color="primary" />
        <IonText className="loading-text">{t("common.loading")}</IonText>
    </IonRow>     

  );
}
