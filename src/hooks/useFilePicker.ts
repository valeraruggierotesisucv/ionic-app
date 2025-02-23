import { FilePicker } from '@capawesome/capacitor-file-picker';
import { useState } from 'react';

const useFilePicker = () => {
  const [musicFile, setMusicFile] = useState<{ nameFile: string; uri: string, mimeType: string} | null>(null);
  const [musicBlob, setMusicBlob] = useState<Blob | null>(null); 
  

  const handleOpenFilePicker = async () => {
    try {
        const result = await FilePicker.pickFiles({
            readData: true, 
        }); 
        const file = result.files[0]; 
        
        if(file && file.data){
          setMusicFile({ nameFile: file.name, uri: file.data, mimeType: file.mimeType}); 
           
        }
        
        console.log(file); 
        
    } catch (err) {
        console.log("Failed to pick file");
    }
  };


  return {
    handleOpenFilePicker,
    musicFile,
    musicBlob
  };
};

export default useFilePicker;
