import React, { useState } from 'react';
import { IonContent, IonFooter, IonHeader, IonPage, IonText } from '@ionic/react';
import { Button } from '../components/Button/Button';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { StepsEnum } from './AddDefaultView';
import "../styles/footer.css"; 
import "../styles/error.css"; 
import { Calendar } from '../components/Calendar/Calendar';
import { useTranslation } from 'react-i18next';

interface AddDateViewProps {
  step: StepsEnum, 
  setStep: (step: StepsEnum) => void, 
  date: Date | null, 
  setDate: (date: Date | null) => void, 
  startTime: Date | null, 
  setStartTime: (date: Date | null) => void, 
  endTime: Date | null, 
  setEndTime: (date: Date | null) => void
}

export function AddDateView({
  step, 
  setStep, 
  date, 
  setDate, 
  startTime, 
  setStartTime, 
  endTime, 
  setEndTime
}: AddDateViewProps) {
  const [showError, setShowError] = useState(false); 
  const { t } = useTranslation();
  function handleNext() {
    if(!date || !startTime || !endTime){
      setShowError(true)
      return 
    } 
    setShowError(true)
    setStep(StepsEnum.DEFAULT)
  }

  return (
    <IonPage>
      <IonHeader className="header">
        <AppHeader title={t('addEvent.when')} goBack={handleNext}/> 
      </IonHeader>
       <IonContent>
        <Calendar 
          date={date}
          initialStartTime={startTime}
          initialEndTime={endTime}
          onDateChange={setDate}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
        />
        { showError && <IonText className='error-message'> {t('addEvent.require_fields')} </IonText>}  
       </IonContent>

       <IonFooter className='footer'>
          <Button 
            label={t('addEvent.next')}
            onClick={handleNext}
          />
        </IonFooter>
    </IonPage>
  );
};
