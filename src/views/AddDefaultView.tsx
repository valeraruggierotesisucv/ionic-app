import React from "react";

export enum StepsEnum {
  DEFAULT = "default",
  DATE = "date",
  CATEGORY = "category",
  LOCATION = "location",
}

interface AddDefaultViewProps {
    /*
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
  location: LatLng | null;
  setLocation: (location: LatLng | null) => void;
  musicFile: { nameFile: string; uri: string } | null;
  setMusicFile: (file: { nameFile: string; uri: string } | null) => void;
  onAddEvent: () => void;
  image: string | null;
  setImage: (image: string | null) => void;
  buttonLabel: string;
  edit?: boolean; 
  disable: boolean
*/}

export function AddDefaultView({
    /*
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
*/}: AddDefaultViewProps) {
  //const { t } = useTranslation();
  //const { isModalVisible, imageUri, openCamera, openGallery, setModalVisible } = useImagePicker();
  //const { musicFileUri, pickMusicFile } = useMusicPicker();
  //const { location : origin, getCurrentLocation } = useCurrentLocation(); 
  //const { audioFileUri, startRecording, stopRecording, isRecording } = useAudioRecorder();
  //const [isAudioModalVisible, setAudioModalVisible] = useState(false);
  //const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  
  /*
  const handleStopRecording = () => {
    stopRecording();
    setAudioModalVisible(false);
  };

  const handleCurrentLocation = () => {
    if(origin){
      setLocation({
        latitude: origin.coords.latitude,
        longitude: origin.coords.longitude,
      })
      setLocationModalVisible(false)
    }
  }

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
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
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
        </View>
        <TouchableOpacity onPress={onClear} style={styles.clear}>
          <MaterialCommunityIcons name="close" size={16} color={theme.colors["secondary"]} />
        </TouchableOpacity>
      </View>
      
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
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
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
        </View>
        <TouchableOpacity onPress={onClear} style={styles.clear}>
          <MaterialCommunityIcons name="close" size={16} color={theme.colors["secondary"]} />
        </TouchableOpacity>
      </View>
      
    );
  };

  const CategoryPill = () => {
    function onClear(){
      setCategory(null)
    }

    return(
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Chip
          label={category?.toUpperCase() || ""}
          variant={ChipVariant.LIGHT}
          onPress={() => setStep(StepsEnum.CATEGORY)}
        />
        <TouchableOpacity onPress={onClear} style={styles.clear}>
          <MaterialCommunityIcons name="close" size={16} color={theme.colors["secondary"]} />
        </TouchableOpacity>
      </View>      
    )
  }

  const MusicPill = () => {
    function onClear(){
      setMusicFile(null)
    }

    return(
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Chip 
          label={truncateString(musicFile?.nameFile || "", 30)} 
          variant={ChipVariant.LIGHT} 
        />
        <TouchableOpacity onPress={onClear} style={styles.clear}>
          <MaterialCommunityIcons name="close" size={16} color={theme.colors["secondary"]} />
        </TouchableOpacity>
      </View>      
    )
  }

  useEffect(() => {
    if (imageUri) {
      setImage(imageUri); 
    }
  }, [imageUri]);

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
    <>
      
    </>
  );
}


