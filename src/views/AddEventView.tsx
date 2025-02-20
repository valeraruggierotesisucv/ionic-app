import React, { useState } from 'react';
import { IonContent, IonFooter, IonPage } from '@ionic/react';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { CategoriesEnum, StepsEnum } from '../utils/shareEnums';
import { AddDefaultView } from './AddDefaultView';
import { AddDateView } from './AddDateView';
import { ChooseCategoriesView } from './ChooseCategoriesView';


export function AddEventView() {
  //const { t } = useTranslation();
  //const toast =  useToast(); 
  //const { session, user } = useAuth(); 
  //const navigation = useNavigation<AddStackNavigationProp>();
  //const [modalVisible, setModalVisible] = useState<boolean>(false);

  //const [title, setTitle] = useState<string| null>(null); 
  //const [description, setDescription] = useState<string | null>(null);
  //const [date, setDate] = useState<Date | null>(null);
  //const [startTime, setStartTime] = useState<Date | null>(null);
  //const [endTime, setEndTime] = useState<Date | null>(null);
  const [category, setCategory] = useState<CategoriesEnum | null>(null);
  const [categoryId, setCategoryId] = useState<number|null>(null); 
  //const [location, setLocation] = useState<LatLng | null>(null);
  //const [image, setImage] = useState<string | null>(null);
  //const [musicFile, setMusicFile] = useState<{nameFile: string; uri: string;} | null>(null);
  const [step, setStep] = useState<StepsEnum>(StepsEnum.CATEGORY);
  //const [disable, setDisable] = useState(false); 
  return (
    <IonPage>
      <IonContent>
      {
        step === StepsEnum.DEFAULT ? 
          <AppHeader title='Nuevo Evento' /> 
          : 
          <AppHeader title={step === StepsEnum.DATE ? 'Cuando?' : step === StepsEnum.CATEGORY ? 'CATEGORÍA' : StepsEnum.DEFAULT} goBack={() => setStep(StepsEnum.DEFAULT)}/>
      }

      { step === StepsEnum.DEFAULT && (
        <AddDefaultView
        />
      )}

        {step === StepsEnum.DATE && (
          <AddDateView
          />
        )}

        {step === StepsEnum.CATEGORY && (
          <ChooseCategoriesView
            step={step}
            setStep={setStep}
            category={category}
            setCategory={setCategory}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
          />
        )}
      </IonContent>     
    </IonPage>
  );
};
