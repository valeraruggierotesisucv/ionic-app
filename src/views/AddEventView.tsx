import React, { useState } from 'react';
import { CategoriesEnum, StepsEnum } from '../utils/shareEnums';
import { AddDefaultView } from './AddDefaultView';
import { AddDateView } from './AddDateView';
import { ChooseCategoriesView } from './ChooseCategoriesView';
import { useAuth } from '../contexts/AuthContext';
import { FileController } from '../controllers/FileController';
import { LocationController } from '../controllers/LocationController';
import { FileTypeEnum } from '../services/storage';
import { AddEventController } from '../controllers/AddEventController';
import { Modal } from '../components/Modal/Modal';
import { useHistory } from 'react-router';
import { ROUTES } from '../utils/routes';
import { IonImg, IonText, useIonViewDidEnter } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import "../styles/addDefaultView.css";


export function AddEventView() {
  const { session, user } = useAuth(); 
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const history = useHistory();
  const { t } = useTranslation();

  const [title, setTitle] = useState<string| null>(null); 
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [category, setCategory] = useState<CategoriesEnum | null>(null);
  const [categoryId, setCategoryId] = useState<number|null>(null); 
  const [location, setLocation] = useState<{ latitude: number, longitude: number} | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [musicFile, setMusicFile] = useState<{nameFile: string; uri: string; mimeType:string;} | null>(null);
  const [step, setStep] = useState<StepsEnum>(StepsEnum.DEFAULT);
  const [disable, setDisable] = useState(false); 

  function cleanForm() {
    setTitle(null); 
    setDescription(null);
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setImage(null); 
    setCategory(null);
    setCategoryId(null); 
    setMusicFile(null); 
    setLocation(null);
  }

  async function handleAddEvent() {   
   
    if (title && description && date && startTime && endTime && category && image && musicFile && location && session) {
      setDisable(true);      
      console.log("publicando evento.."); 
      const locationData = {
        latitude: location?.latitude,
        longitude: location?.longitude, 
      }
      
      try{
        const imageUrl = await FileController.uploadFile(image, FileTypeEnum.IMAGE, "image/jpeg"); 
        const musicUrl = await FileController.uploadFile(musicFile.uri, FileTypeEnum.AUDIO, musicFile.mimeType); 
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
        
        const result = await AddEventController.postEvent(session?.access_token, eventData); 
        console.log(result); 
        
        setModalVisible(true);
        setDisable(false); 
        cleanForm()
      }catch(error){
        console.error("Error in AddEventView:", error);
      }
    }else{
      console.error("Error in AddEventView");
    }
    
  }

  
  return (
    <>
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
          musicFile={musicFile}
          setMusicFile={setMusicFile}
          location={location}
          setLocation={setLocation}
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
        <Modal 
          isOpen={modalVisible} 
          onClose={() => {
            history.push(ROUTES.HOME.ROOT);
            setModalVisible(false); 
          }}
        >   
          <div className='success-modal'>
          <IonImg 
              src="../../images/Onboarding.png"
              style={{ width: '200px', height: '200px', marginBottom: '16px' }}
            />
            <IonText style={{
              fontSize: '18px',
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: '8px'
            }}>
              {t("addEvent.event_published")}
            </IonText>
          </div>
        </Modal>
    </>        
  
  );
};
