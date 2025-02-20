import React from 'react';
import { IonContent, IonFooter, IonPage } from '@ionic/react';
import { Button } from '../components/Button/Button';
import "../styles/footer.css"; 

export function AddDateView() {


  return (
    <IonPage>
       <IonContent>

       </IonContent>

       <IonFooter className='footer'>
          <Button 
            label='Siguiente'
            
          />
        </IonFooter>
    </IonPage>
  );
};
