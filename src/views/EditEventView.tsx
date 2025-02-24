import React, { useState, useEffect } from 'react';
import { CategoriesEnum, StepsEnum } from '../utils/shareEnums';
import { AddDefaultView } from './AddDefaultView';
import { AddDateView } from './AddDateView';
import { ChooseCategoriesView } from './ChooseCategoriesView';
import { useAuth } from '../contexts/AuthContext';
import { FileController } from '../controllers/FileController';
import { LocationController } from '../controllers/LocationController';
import { FileTypeEnum } from '../services/storage';
import { EditEventController } from '../controllers/EditEventController';
import { EventDetailsController } from '../controllers/EventDetailsController';
import { Modal } from '../components/Modal/Modal';
import { useHistory, useParams } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import { IonImg, IonText, useIonViewDidEnter, IonLoading } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { getDate } from '../utils/formatDate';
import { convertTimeToDate } from '../utils/formatHour';
import { truncateString } from '../utils/formatString';
import "../styles/addDefaultView.css";
import { Loading } from '../components/Loading/Loading';

export function EditEventView() {
  const { session, user } = useAuth(); 
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { eventId } = useParams<{ eventId: string }>();
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

  useEffect(() => {
    async function fetchEventDetails() {
      if (session && user && eventId) {
        try {
          const event = await EventDetailsController.getEventDetails(
            session.access_token,
            eventId,
            user.id
          );
          
          const formattedDate = new Date(event?.date || "");
          const formattedStartsAt = convertTimeToDate(event?.startsAt || "");
          const formattedEndsAt = convertTimeToDate(event?.endsAt || "");
          console.log(formattedDate)
          console.log(event.date)
          setTitle(event.title);
          setDescription(event.description);
          setDate(formattedDate);
          setStartTime(formattedStartsAt);
          setEndTime(formattedEndsAt);
          setCategory(event.category as CategoriesEnum);
          setCategoryId(parseInt(event.categoryId));
          setMusicFile({ 
            nameFile: truncateString(event.musicUrl, 20), 
            uri: event.musicUrl,
            mimeType: 'audio/mpeg' 
          });
          setImage(event.eventImage);
          setLocation({
            latitude: parseFloat(event.latitude),
            longitude: parseFloat(event.longitude)
          });
        } catch (error) {
          console.error("Error in fetchEventDetails:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchEventDetails();
  }, [eventId, session, user]);

  async function handleEditEvent() {   
    if (title && description && date && startTime && endTime && category && image && musicFile && location && session) {
      setDisable(true);      
      try {
        const imageUrl = image.startsWith("http") ? image : await FileController.uploadFile(image, FileTypeEnum.IMAGE, "image/jpeg"); 
        const musicUrl = musicFile.uri.startsWith("http") ? musicFile.uri : await FileController.uploadFile(musicFile.uri, FileTypeEnum.AUDIO, musicFile.mimeType); 
        const locationId = await LocationController.addLocation(session?.access_token, location); 

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
        };
        
        await EditEventController.updateEvent(session.access_token, eventData, eventId);
        setModalVisible(true);
        setDisable(false); 
      } catch(error) {
        console.error("Error in EditEventView:", error);
      }
    }
  }

  const handleModalClose = () => {
    if (modalVisible) {  
      setModalVisible(false);
      setTimeout(() => {  
        history.goBack();
      }, 0);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <>
      {step === StepsEnum.DEFAULT && (
        <AddDefaultView
          goBack={true}
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
          onAddEvent={handleEditEvent}
          buttonLabel={t("common.save_changes")}
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
        onClose={handleModalClose}
      >   
        <div className='success-modal'>
          <IonImg 
            src="/images/Onboarding.png"
            style={{ width: '200px', height: '200px', marginBottom: '16px' }}
          />
          <IonText style={{
            fontSize: '18px',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '8px'
          }}>
            {t("editEvent.event_edited")}
          </IonText>
        </div>
      </Modal>
    </>        
  );
}
