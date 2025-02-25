import { IonButton, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonText } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button/Button";
import { closeCircle, addSharp} from "ionicons/icons";
import { CategoriesEnum } from "../utils/shareEnums";
import "../styles/addDefaultView.css"; 
import { AppHeader } from "../components/AppHeader/AppHeader";
import "../styles/header.css"; 
import Input, { InputVariant } from "../components/Input/Input";
import { DisplayInput } from "../components/DisplayInput/DisplayInput";
import { formatHour } from "../utils/formatHour";
import { Chip, ChipVariant } from "../components/Chip/Chip";
import { truncateString } from "../utils/formatString";
import { CustomModal } from "../components/CustomModal/CustomModal";
import useImagePicker from "../hooks/useImagePicker";
import useCurrentLocation from "../hooks/useCurrentLocation";
import useAudioRecorder from "../hooks/useAudioRecorder";
import useFilePicker from "../hooks/useFilePicker";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

export enum StepsEnum {
  DEFAULT = "default",
  DATE = "date",
  CATEGORY = "category",
  LOCATION = "location",
}

interface AddDefaultViewProps {
    
  step: StepsEnum;
  setStep: (step: StepsEnum) => void;
  title: string | null; 
  setTitle: (title: string) => void; 
  description: string | null;
  setDescription: (text: string | null) => void;
  date: Date | null;
  setDate: (date: Date | null) => void; 
  startsAt: Date | null;
  setStartsAt: (date: Date | null) => void; 
  endsAt: Date | null;
  setEndsAt: (date: Date | null) => void; 
  category: CategoriesEnum | null;
  setCategory: (category: CategoriesEnum | null) => void; 
  location: {latitude: number, longitude: number} | null;
  setLocation: (location: {latitude: number, longitude: number} | null) => void;
  musicFile: { nameFile: string; uri: string } | null;
  setMusicFile: (file: { nameFile: string; uri: string, mimeType: string} | null) => void;
  onAddEvent: () => void;
  image: string | null;
  setImage: (image: string | null) => void;
  buttonLabel: string;
  edit?: boolean; 
  disable: boolean;
  goBack?: boolean;
}

export function AddDefaultView({
  goBack=false,
  setStep,
  title, 
  setTitle, 
  description,
  setDescription,
  date,
  setDate, 
  startsAt,
  setStartsAt, 
  endsAt,
  setEndsAt, 
  category,
  setCategory, 
  location,
  setLocation, 
  musicFile,
  setMusicFile,
  onAddEvent,
  image,
  setImage,
  edit = false, 
  disable = false
}: AddDefaultViewProps) {
  const { t } = useTranslation();
  const [imageModal, setImageModal] = useState(false); 
  const [locationModal, setLocationModal] = useState(false);
  const [musicModal, setMusicModal] = useState(false); 
  const { image: imageUri, handleOpenCamera, handleOpenGallery } = useImagePicker();
  const { location: locationCoords, getCurrentLocation } = useCurrentLocation();
  const { musicFile: audioFileUri, isRecording, handleStartRecording, handleStopRecording} = useAudioRecorder(); 
  const { musicFile: musicFileUri, handleOpenFilePicker }= useFilePicker(); 
  const history = useHistory();

  const DatePills = () => {
    if (startsAt === null || endsAt === null || date === null) return;

    const start = formatHour(startsAt);
    const end= formatHour(endsAt);
    const formattedDate = date?.toLocaleDateString();    
    

    function onClear(){
      setDate(null); 
      setStartsAt(null); 
      setEndsAt(null); 
    }
    
    return (
      <IonRow className="custom-row">
        <IonCol size="10" className="chips-col">          
          <Chip
            label={start}
            variant={ChipVariant.LIGHT}
            onPress={() => setStep(StepsEnum.DATE)}
          />
          <Chip
            label={end}
            variant={ChipVariant.LIGHT}
            onPress={() => setStep(StepsEnum.DATE)}
          />
          <Chip
            label={formattedDate}
            variant={ChipVariant.LIGHT}
            onPress={() => setStep(StepsEnum.DATE)}
          />        
        </IonCol>
        <IonCol size="2" className="clear-button-col">
          <IonIcon icon={closeCircle} style={{ width: "100px", height: "20px"}} onClick={onClear}/>        
        </IonCol>       
      </IonRow>      
    );
  };

  const LocationPills = () => {
    if (!location) return;
    
    function onClear(){
      setLocation(null)
    }
    const latitude = location.latitude.toFixed(3);
    const longitude = location.longitude.toFixed(3);

    return (
      <IonRow className="custom-row">
        <IonCol size="10" className="chips-col">          
          <Chip
            label={latitude}
            variant={ChipVariant.LIGHT}
            onPress={() => setStep(StepsEnum.DATE)}
          />
          <Chip
            label={longitude}
            variant={ChipVariant.LIGHT}
            onPress={() => setStep(StepsEnum.DATE)}
          />
        </IonCol>
        <IonCol size="2" className="clear-button-col">
          <IonIcon icon={closeCircle} style={{ width: "100px", height: "20px"}} onClick={onClear}/>        
        </IonCol>       
      </IonRow> 
    );
  };

  const CategoryPill = () => {
    function onClear(){
      setCategory(null)
    }
    
    return(
      <IonRow className="custom-row">
        <IonCol size="10" className="chips-col">          
        <Chip
          label={category?.toUpperCase() || ""}
          variant={ChipVariant.LIGHT}
          onPress={() => setStep(StepsEnum.CATEGORY)}
        /> 
        </IonCol>
        <IonCol size="2" className="clear-button-col">
          <IonIcon icon={closeCircle} style={{ width: "100px", height: "20px"}} onClick={onClear}/>        
        </IonCol>       
      </IonRow> 
    )
  }


  const MusicPill = () => {
    function onClear(){
      setMusicFile(null)
    }    

    return(
      <IonRow className="custom-row">
        <IonCol size="10" className="chips-col">          
          <Chip 
            label={truncateString(musicFile?.nameFile || "", 30)} 
            variant={ChipVariant.LIGHT} 
          />
        </IonCol>
        <IonCol size="2" className="clear-button-col">
          <IonIcon icon={closeCircle} style={{ width: "100px", height: "20px"}} onClick={onClear}/>        
        </IonCol>       
      </IonRow>     
    )
  }



  useEffect(() => {
    if (imageUri) {
      setImage(imageUri); 
      setImageModal(false); 
    }
  }, [imageUri]);

  useEffect(() => {
    if (locationCoords) {
      setLocation(locationCoords); 
      setLocationModal(false); 
    }
  }, [locationCoords]);
  
  useEffect(() => {
    if(audioFileUri){
      setMusicFile(audioFileUri); 
      setMusicModal(false); 
    }

  }, [audioFileUri]); 

  useEffect(() => {
    if (musicFileUri) {
      setMusicFile(musicFileUri);
      setMusicModal(false); 
    }
  }, [musicFileUri]);

  return (
    <IonPage>
      <AppHeader title={goBack ? t("editEvent.title") : t("addEvent.new_event")} goBack={goBack ? () => history.goBack() : undefined}/> 
      

      {/* CONTENT */}
      <IonContent>
        {/* IMAGEN */}
        <IonButton fill="clear" onClick={() => setImageModal(true)} className="image-container">
          {image ? (
            <IonImg src={image} />
          ) : (
            <div className="image-placeholder">
              <IonIcon icon={addSharp} style={{ fontSize: '48px', color: 'black' }} />
            </div>
          )}
        </IonButton>

        {/* Título */}
        <Input
          label={t("addEvent.title")}
          placeholder={t("addEvent.add_title")}
          multiline={false}
          variant={InputVariant.DEFAULT}
          value={title ?? ""}
          onChangeValue={setTitle}
          required={title ? false : true}
        />

         {/* Descripción */}
        <Input
          label={t("addEvent.description")}
          placeholder={t("addEvent.add_description")}
          variant={InputVariant.DEFAULT}
          value={description ?? ""}
          onChangeValue={setDescription}
          required={description ? false : true}
        />

        {/* FECHA Y HORA */}
        {date && startsAt && endsAt ? (
          <DisplayInput
            label={t("addEvent.when")}
            data={<DatePills />}
          />
        ) : (
          <Input
            label={t("addEvent.when")}
            placeholder={t("addEvent.add_date")}
            variant={InputVariant.ARROW}
            onPress={() => setStep(StepsEnum.DATE)}
          />
        )}

         {/* Categoría */}
          {category ? (
            <DisplayInput
              label={t("addEvent.category")}
              data={<CategoryPill/>}
            />
          ) : (
            <Input
              label={t("addEvent.category")}
              placeholder={t("addEvent.add_category")}
              variant={InputVariant.ARROW}
              onPress={() => setStep(StepsEnum.CATEGORY)}
            />
          )}

          {/* MÚSICA */}
          { musicFile
                ? <DisplayInput
                    label={t("addEvent.music")}
                    data={<MusicPill />}
                  />
                : <Input 
                    label={t("addEvent.music")}
                    placeholder={t("addEvent.add_music")}
                    variant={InputVariant.ARROW}
                    onPress={() => setMusicModal(true)}
                />
            }

           {/* UBICACIÓN */}
            {location ? (
              <DisplayInput
                label="Ubicación"
                data={<LocationPills />}
              />
            ) : (
              <Input
                label={t("addEvent.location")}
                placeholder={t("addEvent.add_location")}
                variant={InputVariant.ARROW}
                onPress={() => setLocationModal(true)}
              />
            )} 
      </IonContent>
      
      <CustomModal 
        isOpen={imageModal}
        onClose={() => setImageModal(false)}
      >        
        <IonButton expand="block" className="custom-button" onClick={handleOpenCamera}>{t("addEvent.take_photo")}</IonButton>
        <IonButton expand="block" className="custom-button" onClick={handleOpenGallery}>{t("addEvent.choose_from_gallery")}</IonButton>
        <IonButton expand="block" className="custom-button" onClick={() => setImageModal(false)}>{t("addEvent.cancel")}</IonButton>
      </CustomModal>

      <CustomModal 
        isOpen={locationModal}
        onClose={() => setLocationModal(false)}
      >        
        <IonButton expand="block" className="custom-button" onClick={getCurrentLocation}>{t("addEvent.add_my_location")}</IonButton>
        <IonButton expand="block" className="custom-button" onClick={() => setLocationModal(false)}>{t("addEvent.cancel")}</IonButton>
      </CustomModal>

      <CustomModal 
        isOpen={musicModal}
        onClose={() => setMusicModal(false)}
      >       
        <IonButton expand="block" className="custom-button" onClick={handleOpenFilePicker}>{t("addEvent.choose_from_files")}</IonButton>
        <IonButton expand="block" className="custom-button" onClick={ isRecording ? handleStopRecording : handleStartRecording } >{ isRecording ? t("addEvent.stop_recording") : t("addEvent.record_audio")}</IonButton>
        <IonButton expand="block" className="custom-button" onClick={() => setMusicModal(false)}>{t("addEvent.cancel")}</IonButton> 
      </CustomModal>

      <IonFooter className="footer">
        <Button 
          label={goBack ? t("editEvent.publish") : t("addEvent.publish")}
          onClick={onAddEvent}
        />
      </IonFooter>

    </IonPage>
  );
}


