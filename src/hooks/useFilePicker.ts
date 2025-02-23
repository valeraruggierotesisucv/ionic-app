import { FilePicker } from '@capawesome/capacitor-file-picker';
import { useState } from 'react';

const useFilePicker = () => {
  const [musicFile, setMusicFile] = useState<{ nameFile: string; uri: string } | null>(null);
  

  const handleOpenFilePicker = async () => {
    try {
        const result = await FilePicker.pickMedia(); 
        const file = result.files[0]; 
        
        if(file){
            setMusicFile({ nameFile: file.name, uri: file.name})
        }
        
        console.log(file); 
        
    } catch (err) {
        console.log("Failed to pick file");
    }
  };


  return {
    handleOpenFilePicker,
    musicFile,
  };
};

export default useFilePicker;
