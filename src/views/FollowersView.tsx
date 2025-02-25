import { IonContent, IonList, IonPage, IonAlert } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useHistory } from "react-router-dom";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { UserCard, UserCardVariant } from "../components/UserCard/UserCard";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ListUsersController } from "../controllers/ListUsersController";
import { useAuth } from "../contexts/AuthContext";
import { FollowUserController } from "../controllers/FollowUserController";
import { NotificationType } from "../components/NotificationItem/NotificationItem";
import { NotificationsController } from "../controllers/NotificationsController";

interface Follower {
  followerId: string;
  followerName: string;
  followerProfileImage: string;
  followed: boolean;
  isFollowingLoading: boolean;
}

export function FollowersView() {
  const { t } = useTranslation();
  const history = useHistory();
  const [search, setSearch] = useState("");
  const { user, session } = useAuth();
  const [followers, setFollowers] = useState<Follower[] | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const getFollowers = async () => {
    try {
      if (!session) return;
      const response = await ListUsersController.getFollowers(session?.access_token, user!.id);
      setFollowers(response.map((follower) => ({ ...follower, isFollowingLoading: false })));
    } catch (error) {
      console.error("Error in getFollowers:", error);
      setAlertMessage((error as Error).message);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    getFollowers();
  }, []);

  const handleFollow = async (userId: string) => {
    setFollowers(prevFollowers => 
      prevFollowers?.map(follower => 
        follower.followerId === userId 
          ? { ...follower, isFollowingLoading: true } 
          : follower
      ) || null
    );

    try {
      if (!session || !user) return;
      
      const response = await FollowUserController.followUser(
        session.access_token, 
        user.id, 
        userId
      );

      if (response.success) {
        setFollowers(prevFollowers => 
          prevFollowers?.map(follower => 
            follower.followerId === userId 
              ? { ...follower, followed: true } 
              : follower
          ) || null
        );

        // Send notification
        const notificationData = {
          fromUserId: user.id,
          toUserId: userId,
          type: NotificationType.FOLLOW,
          message: t("notifications.FOLLOW")
        };

        await NotificationsController.createNotification(
          session.access_token, 
          notificationData
        );
      }
    } catch (error) {
      console.error("Error in handleFollow:", error);
      setAlertMessage((error as Error).message);
      setShowAlert(true);
    } finally {
      setFollowers(prevFollowers => 
        prevFollowers?.map(follower => 
          follower.followerId === userId 
            ? { ...follower, isFollowingLoading: false } 
            : follower
        ) || null
      );
    }
  };

  const handleUnfollow = async (userId: string) => {
    setFollowers(prevFollowers => 
      prevFollowers?.map(follower => 
        follower.followerId === userId 
          ? { ...follower, isFollowingLoading: true } 
          : follower
      ) || null
    );

    try {
      if (!session) return;
      const response = await FollowUserController.unfollowUser(
        session.access_token, 
        user!.id, 
        userId
      );

      if (response.success) {
        setFollowers(prevFollowers => 
          prevFollowers?.map(follower => 
            follower.followerId === userId 
              ? { ...follower, followed: false } 
              : follower
          ) || null
        );
      }
    } catch (error) {
      console.error("Error in handleUnfollow:", error);
      setAlertMessage((error as Error).message);
      setShowAlert(true);
    } finally {
      setFollowers(prevFollowers => 
        prevFollowers?.map(follower => 
          follower.followerId === userId 
            ? { ...follower, isFollowingLoading: false } 
            : follower
        ) || null
      );
    }
  };

  const filteredFollowers = followers?.filter((follower) =>
    follower.followerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <IonPage>
      <AppHeader title={t("profile.followers")} goBack={() => history.goBack()} />
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Error"
        message={alertMessage}
        buttons={["OK"]}
      />
      <IonContent className="ion-padding">
        <SearchBar
          placeholder={t("search.title")}
          onChange={setSearch}
          value={search}
        />
        <IonList>
          {filteredFollowers?.map((follower) => (
            <UserCard
              key={follower.followerId}
              username={follower.followerName}
              profileImage={follower.followerProfileImage}
              variant={UserCardVariant.WITH_BUTTON}
              actionLabel={follower.followed ? t("common.unfollow") : t("common.follow")}
              onPressButton={() => 
                follower.followed 
                  ? handleUnfollow(follower.followerId) 
                  : handleFollow(follower.followerId)
              }
              disabled={follower.isFollowingLoading}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
