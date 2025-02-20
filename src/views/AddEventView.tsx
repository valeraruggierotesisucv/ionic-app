import React, { useState } from 'react';
import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { CategoriesEnum, StepsEnum } from '../utils/shareEnums';
import { AddDefaultView } from './AddDefaultView';
import { AddDateView } from './AddDateView';
import { ChooseCategoriesView } from './ChooseCategoriesView';
import { image } from 'ionicons/icons';


export function AddEventView() {
  //const { t } = useTranslation();
  //const toast =  useToast(); 
  //const { session, user } = useAuth(); 
  //const navigation = useNavigation<AddStackNavigationProp>();
  //const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [title, setTitle] = useState<string| null>(null); 
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [category, setCategory] = useState<CategoriesEnum | null>(null);
  const [categoryId, setCategoryId] = useState<number|null>(null); 
  //const [location, setLocation] = useState<LatLng | null>(null);
  const [image, setImage] = useState<string | null>(null);
  //const [musicFile, setMusicFile] = useState<{nameFile: string; uri: string;} | null>(null);
  const [step, setStep] = useState<StepsEnum>(StepsEnum.DEFAULT);
  const [disable, setDisable] = useState(false); 

  async function handleAddEvent() {     
    //title && description && date && startTime && endTime && category && image && musicFile && location && session
    console.log("title ", title); 
    console.log("descripcion ", description); 
    console.log(`cuando ${date}, ${startTime}, ${endTime}`); 
    if (category) {
      setDisable(true);      
      /*
      const locationData = {
        latitude: location?.latitude,
        longitude: location?.longitude, 
      }
      */
      try{
        /*
        const imageUrl = await FileController.uploadFile(image, FileTypeEnum.IMAGE); 
        const musicUrl = await FileController.uploadFile(musicFile.uri, FileTypeEnum.AUDIO); 
        const locationId = await LocationController.addLocation(session?.access_token, locationData); 

        const eventData = {
          userId: user?.id,
          title: title,
          description: description,
          date: date.toISOString(),
          startsAt: startTime.toISOString(),              
          endsAt: endTime.toISOString(), 
          eventImage: imageUrl,
          eventMusic: musicUrl, 
          categoryId: categoryId,                                
          locationId: locationId      
        }
        */
        
        //await AddEventController.postEvent(session?.access_token, eventData); 
        
        //setModalVisible(true);
        setDisable(false); 
      }catch(error){
        console.error("Error in AddEventView:", error);
        //Alert.alert("Error", (error as Error).message);
      }
    }else{
      /*
      toast.show(t("addEvent.require_fields"), {
        type: "normal",
        placement: "top",
      })
        */
    }
    
  }

  return (
    <IonPage>
      <IonContent>       
    
      { step === StepsEnum.DEFAULT && (
        <AddDefaultView
          step={step}
          setStep={setStep}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          date={date}
          setDate={setDate}
          startsAt={startTime}
          setStartsAt={setStartTime}
          endsAt={endTime}
          setEndsAt={setEndTime}
          category={category}
          setCategory={setCategory}
          image={image}
          setImage={setImage}
          onAddEvent={handleAddEvent}
          buttonLabel='Publicar'
          disable={disable}
        />
      )}

        {step === StepsEnum.DATE && (
          <AddDateView
            step={step}
            setStep={setStep}
            date={date}
            setDate={setDate}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
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
