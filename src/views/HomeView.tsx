import React, { useEffect, useState } from 'react';
import { 
  IonContent, 
  IonLoading, 
  IonPage, 
  IonText,
  useIonViewWillLeave
} from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { EventCard } from '../components/EventCard/EventCard';
import { ListEventsController } from '../controllers/ListEventsController';
import {  ProfileController } from '../controllers/ProfileController';
import { IMAGE_PLACEHOLDER } from '../utils/consts';
import { Loading } from '../components/Loading/Loading';
import { NotificationType } from '../components/NotificationItem/NotificationItem';
import { CommentEventController } from '../controllers/CommentEventController';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import { LikeEventController } from '../controllers/LikeEventController';
import { useIonViewWillEnter } from '@ionic/react';
import { NotificationsController } from '../controllers/NotificationsController';



interface UserComment {
  username: string;
  profileImage: string;
}

export const HomeView = () => {
  const history = useHistory();
  const [events, setEvents] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const [userComment, setUserComment] = useState<UserComment>({
    username: "",
    profileImage: "",
  });

  const { session, user } = useAuth();
  
   
  async function fetchEvents (){
    setIsLoading(true); 
    if(session && user){
      try {
        const result = await ListEventsController.getHomeEvents(session.access_token, user.id)
        setEvents(result); 
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching events", error);
        setIsLoading(false)
      }
    }            
  }    
  async function fetchProfile(){
    if (!session) return
    const profile = await ProfileController.getProfile(session?.access_token, user?.id || "");
    setUserComment({
      "username": profile.username, 
      "profileImage": profile.profileImage || IMAGE_PLACEHOLDER
    })
  }




  const fetchComments = async (eventId: string) => {
    if(session){
    try {
        return await CommentEventController.getEventComments(session?.access_token, eventId)
      } catch (error) {
        console.error("Error fetching comments for event:", eventId, error);
        return []; 
      }
    }      
  };

  const onComment = async (eventId: string, comment: string, eventImage: string) => {
    if(session && user){
      try {
        await CommentEventController.createComment(session?.access_token, eventId, {
          userId: user?.id, 
          text: comment
        })

        const toUserId = await ProfileController.getUserId(session.access_token, eventId); 

        // Send notification      
        const notificationData = {
          fromUserId: user.id, 
          toUserId: toUserId.data,  
          type:  NotificationType.COMMENT_EVENT, 
          message: t("notifications.COMMENT"), 
          eventImage: eventImage
        }

        if(session){
          await NotificationsController.createNotification(session?.access_token, notificationData); 
        } 

      } catch (error) {
        console.error("Error adding comment", error);
      }
    }    
  }

  const handleLike = async (eventId: string, eventImage: string, isLike: boolean) => {
    if (session && user) {
      try {
        setEvents(currentEvents => {
          const newEvents = currentEvents?.map(event => 
            event.eventId === eventId 
              ? { ...event, isLiked: !event.isLiked }
              : event
          );
          
          return newEvents;
        });
        const result = await LikeEventController.likeEvent(session.access_token, eventId, user.id);
        const toUserId = await ProfileController.getUserId(session.access_token, eventId); 

        // Send notification      
        const notificationData = {
          fromUserId: user.id, 
          toUserId: toUserId.data,  
          type:  NotificationType.LIKE_EVENT, 
          message: t("notifications.LIKE"), 
          eventImage: eventImage
        }
  
        if(session && !isLike){
          await NotificationsController.createNotification(session?.access_token, notificationData); 
        } 
        
        if(result.isActive){
          setEvents(currentEvents => {
            const newEvents = currentEvents?.map(event => 
              event.eventId === eventId 
                ? { ...event, isLiked: result.isActive }
                : event
            );
            return newEvents;
          });
        }
        
      } catch (error) {
        console.error("Error handling like:", error);
      }
    }
  };

  useIonViewWillEnter(() => {
    fetchEvents()
    fetchProfile()
  });

  useIonViewWillLeave(() => {
    setEvents([])
  });
  return (
    <IonPage>
      <AppHeader />
      <IonContent>
        {isLoading ? (
          <Loading />
        ) : (
          events && events.map((event) => (
            <EventCard 
              key={event.eventId}
              date={event.date}
              description={event.description}
              eventId={event.eventId}
              eventImage={event.eventImage}
              isLiked={event.isLiked}
              profileImage={event.profileImage}
              endsAt={event.endsAt}
              latitude={event.latitude}
              category={event.category}
              username={event.username}
              musicUrl={event.musicUrl}
              startsAt={event.startsAt}
              title={event.title}
              handleLike={() => handleLike(event.eventId, event.eventImage, event.isLiked)}
              onShare={() => console.log("")}
              onComment={onComment}
              onPressUser={() => { console.log("onPressUser"); history.push(`/home/profile-details/${event.userId}`)}}
              onMoreDetails={() => history.push(ROUTES.HOME.EVENT_DETAILS.replace(":eventId", event.eventId))}   
              userComment={userComment}
              fetchComments={() => fetchComments(event.eventId)}
            />
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

