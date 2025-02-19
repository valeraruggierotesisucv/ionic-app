import React, { useState } from 'react';
import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { Button } from '../components/Button/Button';
import "../theme/footer.css"; 
import AddDateView from './ChooseCategoryView';
import ChooseCategoryView from './ChooseCategoryView';
import { CategoriesEnum, StepsEnum } from '../utils/shareEnums';




const AddEventView: React.FC = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [title, setTitle] = useState<string| null>(null); 
    const [description, setDescription] = useState<string | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [category, setCategory] = useState<CategoriesEnum | null>(null);
    const [categoryId, setCategoryId] = useState<number|null>(null); 
    //const [location, setLocation] = useState<LatLng | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [musicFile, setMusicFile] = useState<{nameFile: string; uri: string;} | null>(null);
    const [step, setStep] = useState<StepsEnum>(StepsEnum.DEFAULT);
    const [disable, setDisable] = useState(false); 

  return (
    <IonPage>
        {
          step === StepsEnum.DEFAULT ? 
            <AppHeader title='Nuevo Evento'/> 
            : 
            <AppHeader title={step === StepsEnum.DATE ? '¿Cuándo?' : (step === StepsEnum.CATEGORY ? 'Categoría' : 'Nuevo Evento')} />
        }
      
      <IonContent>
        {step === StepsEnum.DEFAULT && (
          <AddEventView
           
          />
        )}

        {step === StepsEnum.DATE && (
          <AddDateView
          />
        )}

        {step === StepsEnum.CATEGORY && (
          <ChooseCategoryView
          />
        )}

      </IonContent>
      <IonFooter className='footer'>
        <Button  label='Publicar'/>
      </IonFooter>
    </IonPage>
  );
};

export default AddEventView; 