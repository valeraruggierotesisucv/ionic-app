import { IonContent, IonPage, IonSpinner, useIonViewWillEnter } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { EventCard } from "../components/EventCard/EventCard";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { EventDetailsController } from "../controllers/EventDetailsController";
import { EventModel } from "../models/EventModel";
import { CommentEventController } from "../controllers/CommentEventController";
import { ProfileController } from "../controllers/ProfileController";
import { LikeEventController } from "../controllers/LikeEventController";
import { ShareEventController } from "../controllers/ShareEventController";
import { NotificationType } from "../components/NotificationItem/NotificationItem";
import { NotificationsController } from "../controllers/NotificationsController";
import { IMAGE_PLACEHOLDER } from "../utils/consts";
import { Button, ButtonSize, ButtonVariant } from "../components/Button/Button";
import "../styles/eventDetailsView.css";
import { ROUTES } from "../utils/routes";
import { Loading } from "../components/Loading/Loading";
import { useTranslation } from "react-i18next";

interface LocationState {
    canEdit?: boolean;
}

export function EventDetailsView() {
    const history = useHistory();
    const { t } = useTranslation();
    const location = useLocation<LocationState>();
    const { eventId } = useParams<{ eventId: string }>();
    const canEdit = location.state?.canEdit;
    const { session, user } = useAuth();
    const [event, setEvent] = useState<EventModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userComment, setUserComment] = useState<{ username: string, profileImage: string }>({
        username: "",
        profileImage: IMAGE_PLACEHOLDER
    });

    const fetchComments = async (eventId: string) => {
        try {
            if (session) {
                return await CommentEventController.getEventComments(session.access_token, eventId);
            }
            return [];
        } catch (error) {
            console.error("Error fetching comments for event:", eventId, error);
            return [];
        }
    };

    const onComment = async (eventId: string, comment: string, eventImage: string) => {
        if (!session || !user) return;

        try {
            await CommentEventController.createComment(session.access_token, eventId, {
                userId: user.id,
                text: comment
            });

            const toUserId = await ProfileController.getUserId(session.access_token, eventId);

            const notificationData = {
                fromUserId: user.id,
                toUserId: toUserId.data,
                type: NotificationType.COMMENT_EVENT,
                message: "New comment on your event",
                eventImage: eventImage
            };

            await NotificationsController.createNotification(session.access_token, notificationData);
        } catch (error) {
            console.error("Error in onComment:", error);
        }
    };

    const handleLike = async (eventId: string, eventImage: string, toUserId: string, isLiked: boolean) => {
        if (!session || !user) return;

        try {
            setEvent(prevEvent => prevEvent ? { ...prevEvent, isLiked: !prevEvent.isLiked } : prevEvent);
            const result = await LikeEventController.likeEvent(session.access_token, eventId, user.id);

            if (!isLiked) {
                const notificationData = {
                    fromUserId: user.id,
                    toUserId: toUserId,
                    type: NotificationType.LIKE_EVENT,
                    message: "Liked your event",
                    eventImage: eventImage
                };
                await NotificationsController.createNotification(session.access_token, notificationData);
            }

            if (result.isActive) {
                setEvent(prevEvent => prevEvent ? { ...prevEvent, isLiked: result.isActive } : prevEvent);
            }
        } catch (error) {
            console.error("Error handling like:", error);
        }
    };

    

    const fetchEventDetails = async () => {
        if (!session || !user || !eventId) return;

        setIsLoading(true);
        try {
            const result = await EventDetailsController.getEventDetails(session.access_token, eventId, user.id);
            setEvent(result);

            const profile = await ProfileController.getProfile(session.access_token, user.id);
            setUserComment({
                username: profile.username,
                profileImage: profile.profileImage || IMAGE_PLACEHOLDER
            });
        } catch (error) {
            console.error("Error fetching event details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useIonViewWillEnter(() => {
        fetchEventDetails();
    });

    if (isLoading) {
        return (
            <IonPage>
                <AppHeader title="Event Details" goBack={() => history.goBack()} />
                <IonContent className="ion-padding">
                    <Loading />
                </IonContent>
            </IonPage>
        );
    }

    return (
        <IonPage>
            <AppHeader title="Event Details" goBack={() => history.goBack()} />
            <IonContent>
                <div className="event-details-container">
                    <EventCard
                        eventId={event?.eventId || "N/A"}
                        profileImage={event?.profileImage || IMAGE_PLACEHOLDER}
                        username={event?.username || "N/A"}
                        eventImage={event?.eventImage || IMAGE_PLACEHOLDER}
                        title={event?.title || "N/A"}
                        description={event?.description || "N/A"}
                        isLiked={event?.isLiked || false}
                        handleLike={() => handleLike(
                            event?.eventId || "",
                            event?.eventImage || IMAGE_PLACEHOLDER,
                            event?.userId || "",
                            event?.isLiked || false
                        )}
                        date={event?.date || "N/A"}
                        variant="details"
                        latitude={event?.latitude}
                        longitude={event?.longitude}
                        startsAt={event?.startsAt}
                        endsAt={event?.endsAt}
                        category={event?.category}
                        onPressUser={() => {}}
                        onComment={onComment}
                        userComment={userComment}
                        onShare={() => ShareEventController.shareEvent(`Check out this event: ${event?.title} on ${event?.date}`)}
                        fetchComments={() => fetchComments(event?.eventId || "")}
                        musicUrl={event?.musicUrl}
                    />
                {canEdit && (
                    <div className="edit-button-container">
                        <Button
                            label={t('eventDetails.edit')}
                            onClick={() => history.push(ROUTES.PROFILE.EDIT_EVENT.replace(":eventId", eventId))}
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.LARGE}
                        />
                    </div>
                )}
                </div>
            </IonContent>
        </IonPage>
    );
}
