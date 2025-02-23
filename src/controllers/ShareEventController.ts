
import { t } from "i18next";
export class ShareEventController {

    static async shareEvent(message: string) {
        try {
            return true;
          } catch (error: any) {
            console.error("Error in ShareEventController:", error);
            throw new Error(t("error.error_sharing_event"));
          }
    }
}