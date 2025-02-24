
import { t } from "i18next";
import { Share } from '@capacitor/share';
export class ShareEventController {

    static async shareEvent(message: string) {
        try {
            await Share.share({
              text: message,
            });
          } catch (error: any) {
            console.error("Error in ShareEventController:", error);
            throw new Error(t("error.error_sharing_event"));
          }
    }
}