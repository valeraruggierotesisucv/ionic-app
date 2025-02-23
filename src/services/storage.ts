import { supabase } from "../supabaseClient";

export enum FileTypeEnum {
  "IMAGE" = "image", 
  "AUDIO" = "audio"
}

function dataURLToBlob(dataUrl: string): Blob {
    const arr = dataUrl.split(',');
    const match = arr[0].match(/:(.*?);/);
    
    if (!match) {
      throw new Error('Invalid MIME type in data URL');
    }
    
    const mime = match[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new Blob([u8arr], {type: mime});
}

function dataURItoBlob(dataURI: any, mimeType: string) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: mimeType });    
    return blob;
}
  

export async function uploadFile(uri: string, type: FileTypeEnum, mimeType: string){
  const fileName = `${Date.now()}`; 
  let bucket = "EventImages"; 
  let contentType = "image/jpeg"; 
  let fileUri = uri; 

  if(type === FileTypeEnum.AUDIO ){
    bucket = "EventMusic"; 
    contentType = "audio/mpeg"; 
  }

  try{
    let blob; 

    if(type === FileTypeEnum.IMAGE){
        blob = dataURLToBlob(uri);
    }else{
        blob = dataURItoBlob(uri, mimeType); 
    }
    
    // Upload file
    const { error, data } = await supabase
        .storage
        .from(bucket)
        .upload(fileName, blob, { contentType: contentType, upsert: false });

    if (error) {
      console.error('Error uploading file: ', error);
    }

    // Get the public URL of the uploaded file
    if(data){
      const { data: { publicUrl} } = await supabase
      .storage
      .from(bucket)
      .getPublicUrl(data?.path);

      // Return the public URL
      return publicUrl;  
    }
  }catch(error){
    console.error('Error in uploadFile:', error);
  }  

}

export async function deleteFile(uri: string, type: FileTypeEnum) {
  let name = uri.split('EventImages/')[1]; 
  let bucket = 'EventImages'; 

  if(type === FileTypeEnum.AUDIO){
    name = uri.split('EventMusic/')[1]; 
    bucket = 'EventMusic'
  }

  try{
    const { data, error } = await supabase
    .storage
    .from(bucket)
    .remove([name])

    if (error) {
      throw error; 
    }

    console.log("ARCHIVO ELIMINADO-->", data)
    return name
  }catch(error){
    console.error('Error deleting file', error);
  }
  
}
