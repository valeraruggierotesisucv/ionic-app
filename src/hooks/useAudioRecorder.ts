import { VoiceRecorder } from 'capacitor-voice-recorder';
import { useState, useCallback } from 'react';

const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [musicFile, setMusicFile] = useState< { nameFile: string; uri: string, mimeType: string}  | null>(null);
  const [error, setError] = useState(null);

  const handleStartRecording = async () => {
    try {
        const permission = await VoiceRecorder.requestAudioRecordingPermission(); 

        if(permission){
            setIsRecording(true); 
            await VoiceRecorder.startRecording();       
        }else{
            console.log("Permission to record was not granted."); 
        }
    } catch (err) {
        console.log("Failed to start recording");
    }
  };

   
    const handleStopRecording = async() => {
        try{
            const result = await VoiceRecorder.stopRecording();
            setIsRecording(false); 
            if (result.value) {
                const audioBase64 = result.value.recordDataBase64;
                setMusicFile({ nameFile: "Audio", uri: audioBase64, mimeType: result.value.mimeType}); 
                console.log(audioBase64); 
            } else {
                console.log("Failed to stop recording");
            }        
        }catch(error){
            console.log("Failed to stop recording");
        }        
    }; 

  return {
    isRecording,
    musicFile,
    error,
    handleStartRecording,
    handleStopRecording
  };
};

export default useAudioRecorder;
