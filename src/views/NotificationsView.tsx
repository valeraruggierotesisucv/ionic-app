import { IonContent, IonPage, useIonViewDidEnter } from "@ionic/react";
import NotificationItem from "../components/NotificationItem/NotificationItem";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { NotificationsController } from "../controllers/NotificationsController";
import { Loading } from "../components/Loading/Loading";
import { NotificationModel } from "../models/NotificationModel";


export function NotificationsView(){
    const  { t } = useTranslation(); 
    const { session , user} = useAuth(); 
    const [isLoading, setIsLoading] = useState(true); 
    const [ notifications, setNotifications] = useState<NotificationModel[]>(); 

    useIonViewDidEnter(() => {
       async function fetchNotifications(){
        if(session && user){
           try{
            setIsLoading(true); 
            const result = await NotificationsController.getNotifications(session.access_token, user.id); 
            setNotifications(result || []); 
            setIsLoading(false); 
           }catch(error){
            console.log("Error in fetchNotifications:", error); 
           }
        }
       }

       fetchNotifications(); 
    }); 

    return(
        <IonPage>
        <AppHeader 
            title={t("notifications.title")}
        />
        <IonContent>
        {
            isLoading
            ? <Loading />
            : (notifications && notifications.map((notification) => {
                return(
                    <NotificationItem 
                        isNew={false}
                        timestamp={notification.timestamp}
                        type={notification.type}
                        user={notification.user}
                        userAvatar={notification.userAvatar}
                        eventImage={notification.eventImage}
                    />
                )
            }))
        }
        </IonContent>
        </IonPage>
    )
}