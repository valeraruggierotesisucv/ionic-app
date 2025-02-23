import UserModel from "../models/UserModel";
import { t } from "i18next";
export interface Event {
    id: string;
    imageUrl: string;
}

export class ProfileController {
    static async getProfile(token: string, userId: string) {
        return await UserModel.getUserById(token, userId);
    }

    static async getUserEvents(token: string, userId: string) {
        return await UserModel.getUserEvents(token, userId);
    }

    static async getUserId(token:string, eventId: string){
        try{
            return await UserModel.getUserId(token, eventId)
        }catch(error){
            console.error("Error getting user Id", error);
            throw error;
        }
    }
}
