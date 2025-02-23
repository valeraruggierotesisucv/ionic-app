
import { t } from "i18next";
import { deleteFile, FileTypeEnum, uploadFile } from "../services/storage";

export class FileController {
    static async uploadFile(uri: string, type: FileTypeEnum, mimeType: string){        
        try {
            return await uploadFile(uri, type, mimeType);            
        } catch (error) {
            console.error("Error in FileController:", error);
            throw new Error(t("error.error_uploading_file"));
        }
    }

    static async deleteFile(uri: string, type: FileTypeEnum){
        try {
            return  await deleteFile(uri, type); 
        } catch (error) {
            console.error("Error in FileController:", error);
            throw new Error(t("error.error_deleting_file"));
        }
    }
}