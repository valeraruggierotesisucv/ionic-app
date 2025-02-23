import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { ProfileController } from "../controllers/ProfileController";
import { FollowUserController } from "../controllers/FollowUserController";
import { ProfileCard } from "../components/ProfileCard/ProfileCard";
import { EventThumbnailList } from "../components/EventThumbnailList/EventThumbnailList";
import UserModel from "../models/UserModel";
import "./profileDetailsView.css";

export function ProfileDetailsView() {
    const { t } = useTranslation();
    const history = useHistory();
    const { userId } = useParams<{ userId: string }>();
    const [isFollowing, setIsFollowing] = useState(false);
    const [user, setUser] = useState<UserModel | null>(null);
    const [events, setEvents] = useState<any[]>([]);
    const { user: authUser, session } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowingLoading, setIsFollowingLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchProfile = async () => {
            if (!session?.access_token || !authUser?.id) return;
            try {
                const userProfile = await ProfileController.getProfile(
                    session.access_token,
                    userId
                );
                setUser(userProfile);

                const userEvents = await ProfileController.getUserEvents(
                    session.access_token,
                    userId
                );
                setEvents(userEvents);

                const followResponse = await FollowUserController.isFollowing(
                    session.access_token,
                    authUser.id,
                    userId
                );
                setIsFollowing(followResponse.isFollowing);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [userId, session, authUser]);

    const handleFollow = async () => {
        if (!session?.access_token || !authUser?.id) return;
        setIsFollowingLoading(true);
        try {
            const response = await FollowUserController.followUser(
                session.access_token,
                authUser.id,
                userId
            );
            if (response.success) {
                setIsFollowing(true);
                if (user) {
                    setUser({ ...user, followersCounter: user.followersCounter + 1 });
                }
            }
        } catch (error) {
            console.error("Error following user:", error);
        } finally {
            setIsFollowingLoading(false);
        }
    };

    const handleUnfollow = async () => {
        if (!session?.access_token || !authUser?.id) return;
        setIsFollowingLoading(true);
        try {
            const response = await FollowUserController.unfollowUser(
                session.access_token,
                authUser.id,
                userId
            );
            if (response.success) {
                setIsFollowing(false);
                if (user) {
                    setUser({ ...user, followersCounter: user.followersCounter - 1 });
                }
            }
        } catch (error) {
            console.error("Error unfollowing user:", error);
        } finally {
            setIsFollowingLoading(false);
        }
    };

    return (
        <IonPage>
            <AppHeader title={t("profile.details")} goBack={() => history.goBack()} />
            <IonContent>
                {isLoading ? (
                    <div className="profile-details-loading">
                        <IonSpinner />
                    </div>
                ) : user && (
                    <>
                        <ProfileCard 
                            username={user.username}
                            biography={user.biography || t("profile.no_bio")}
                            profileImage={user.profileImage}
                            events={events.length}
                            followers={user.followersCounter}
                            following={user.followingCounter}
                            isFollowing={isFollowing}
                            disableFollowButton={isFollowingLoading}
                            onFollow={() => isFollowing ? handleUnfollow() : handleFollow()}
                        />
                        <EventThumbnailList
                            events={events.map(event => ({
                                id: event.id,
                                imageUrl: event.imageUrl
                            }))}
                            onPressEvent={(id) => console.log("Event pressed", id)}
                        />
                    </>
                )}
            </IonContent>
        </IonPage>
    );
}
