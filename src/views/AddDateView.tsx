import React from 'react';
import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button } from '../components/Button/Button';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { StepsEnum } from './AddDefaultView';
import "../styles/footer.css"; 
import { Calendar } from '../components/Calendar/Calendar';

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

  function handleNext() {
    if (setStep) {
      setStep(StepsEnum.DEFAULT);
    }
  }

  return (
    <IonPage>
      <IonHeader className="header">
        <AppHeader title='¿Cuándo?' goBack={handleNext}/> 
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
        
       </IonContent>

       <IonFooter className='footer'>
          <Button 
            label='Siguiente'
            onClick={handleNext}
          />
        </IonFooter>
    </IonPage>
  );
};
