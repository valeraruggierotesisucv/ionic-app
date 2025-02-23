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
import { Camera, CameraResultType, CameraSource, GalleryImageOptions } from "@capacitor/camera";
import useImagePicker from "../hooks/useImagePicker";
import { Geolocation } from "@capacitor/geolocation";
import { VoiceRecorder } from "capacitor-voice-recorder";

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
  setMusicFile: (file: { nameFile: string; uri: string } | null) => void;
  onAddEvent: () => void;
  image: string | null;
  setImage: (image: string | null) => void;
  buttonLabel: string;
  edit?: boolean; 
  disable: boolean
}

export function AddDefaultView({
    
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
  //const { t } = useTranslation();
  //const { isModalVisible, imageUri, openCamera, openGallery, setModalVisible } = useImagePicker();
  //const { musicFileUri, pickMusicFile } = useMusicPicker();
  //const { location : origin, getCurrentLocation } = useCurrentLocation(); 
  //const { audioFileUri, startRecording, stopRecording, isRecording } = useAudioRecorder();
  //const [isAudioModalVisible, setAudioModalVisible] = useState(false);
  //const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [imageModal, setImageModal] = useState(false); 
  const [locationModal, setLocationModal] = useState(false);
  const [musicModal, setMusicModal] = useState(false); 
  const [isRecording, setIsRecording] = useState(false); 
  const { image: imageUri, error, loading, handleOpenCamera, handleOpenGallery } = useImagePicker();

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition()
      .then((resp) => {
        setLocation({
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude,
        });
        setLocationModal(false); 
      })
      .catch((error) => {
        console.log('Error obteniendo la ubicación', error);
      });
  };
  
  const handleStartRecording = async() => {
    const permission = await VoiceRecorder.requestAudioRecordingPermission(); 

    if(permission){
      setIsRecording(true); 
      await VoiceRecorder.startRecording();       
    }
  }

  
  const handleStopRecording = async() => {
    setIsRecording(false); 
    const result = await VoiceRecorder.stopRecording();
    setMusicModal(false);

    if (result.value) {
      const audioBase64 = result.value.recordDataBase64;
      console.log(audioBase64); 
    } else {
      // Manejar error al detener la grabación
      console.log("Failed to stop recording");
    }
  };
  

  
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
/*
  useEffect(() => {
    if(musicFileUri){
      setMusicFile(musicFileUri)
    }

  }, [musicFileUri]); 

  useEffect(() => {
    if (audioFileUri) {
      setMusicFile(audioFileUri);
    }
  }, [audioFileUri]);
*/
  return (
    <IonPage>
      <IonHeader className="header">
        <AppHeader title='Nuevo Evento'/> 
      </IonHeader>

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
          label="Titulo"
          placeholder="Agregar título"
          multiline={false}
          variant={InputVariant.DEFAULT}
          value={title ?? ""}
          onChangeValue={setTitle}
          required={title ? false : true}
        />

         {/* Descripción */}
        <Input
          label="Descripción"
          placeholder="Agrega una descripción"
          variant={InputVariant.DEFAULT}
          value={description ?? ""}
          onChangeValue={setDescription}
          required={description ? false : true}
        />

        {/* FECHA Y HORA */}
        {date && startsAt && endsAt ? (
          <DisplayInput
            label="¿Cuando?"
            data={<DatePills />}
          />
        ) : (
          <Input
            label="¿Cuando?"
            placeholder="Agregar fecha y hora"
            variant={InputVariant.ARROW}
            onPress={() => setStep(StepsEnum.DATE)}
          />
        )}

         {/* Categoría */}
          {category ? (
            <DisplayInput
              label="Categoría"
              data={<CategoryPill/>}
            />
          ) : (
            <Input
              label="Categoría"
              placeholder="Agrega la categoria de tu evento"
              variant={InputVariant.ARROW}
              onPress={() => setStep(StepsEnum.CATEGORY)}
            />
          )}

          {/* MÚSICA */}
          { musicFile
                ? <DisplayInput
                    label="Música"
                    data={<MusicPill />}
                  />
                : <Input 
                    label="Música"
                    placeholder="Agrega música a tu evento"
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
                label="Ubicación"
                placeholder="Agrega tu ubicación"
                variant={InputVariant.ARROW}
                onPress={() => setLocationModal(true)}
              />
            )} 
      </IonContent>
      
      <CustomModal 
        isOpen={imageModal}
      >        
        <IonButton expand="block" className="custom-button" onClick={handleOpenCamera}>Tomar foto</IonButton>
        <IonButton expand="block" className="custom-button" onClick={handleOpenGallery}>Elegir de la Galería</IonButton>
        <IonButton expand="block" className="custom-button" onClick={() => setImageModal(false)}>Cancelar</IonButton>
      </CustomModal>

      <CustomModal 
        isOpen={locationModal}
      >        
        <IonButton expand="block" className="custom-button" onClick={getCurrentLocation}>Agregar mi ubicación</IonButton>
        <IonButton expand="block" className="custom-button" onClick={() => setLocationModal(false)}>Cancelar</IonButton>
      </CustomModal>

      <CustomModal 
        isOpen={musicModal}
      >       
        <IonButton expand="block" className="custom-button">Escoger de los archivos</IonButton>
        <IonButton expand="block" className="custom-button" onClick={ isRecording ? handleStopRecording : handleStartRecording } >{ isRecording ? "Detener grabación" : "Grabar Audio"}</IonButton>
        <IonButton expand="block" className="custom-button" onClick={() => setMusicModal(false)}>Cancelar</IonButton> 
      </CustomModal>

      <IonFooter className="footer">
        <Button 
          label='Publicar'
          onClick={onAddEvent}
        />
      </IonFooter>

    </IonPage>
  );
}


