import React, { useState } from 'react';
import { IonPage } from '@ionic/react';

import "../theme/footer.css"; 
import { AppHeader } from '../components/AppHeader/AppHeader';
import { StepsEnum } from '../utils/shareEnums';
import { AddDefaultView } from './AddDefaultView';
import AddDateView from './AddDateView';
import ChooseCategoryView from './ChooseCategoryView';


const AddEventView: React.FC = () => {
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
  //const [category, setCategory] = useState<CategoriesEnum | null>(null);
  //const [categoryId, setCategoryId] = useState<number|null>(null); 
  //const [location, setLocation] = useState<LatLng | null>(null);
  //const [image, setImage] = useState<string | null>(null);
  //const [musicFile, setMusicFile] = useState<{nameFile: string; uri: string;} | null>(null);
  const [step, setStep] = useState<StepsEnum>(StepsEnum.DEFAULT);
  //const [disable, setDisable] = useState(false); 
  return (
    <IonPage>
      {
        step === StepsEnum.DEFAULT ? 
          <AppHeader title='Nuevo Evento' /> 
          : 
          <AppHeader title={step === StepsEnum.DATE ? 'Cuando?' : step === StepsEnum.CATEGORY ? 'CATERGORÍA' : StepsEnum.DEFAULT} />
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
          <ChooseCategoryView

          />
        )}
    </IonPage>
  );
};

export default AddEventView; 