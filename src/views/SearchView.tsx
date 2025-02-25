import { IonContent, IonList, IonPage, IonText } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useEffect, useState, useCallback } from "react";
import { Tab, Tabs } from "../components/Tabs/Tabs";
import '../styles/searchView.css';
import { EventCard } from "../components/EventCard/EventCard";
import { Pills } from "../components/Pills/Pills";
import { UserCard } from "../components/UserCard/UserCard";
import { useAuth } from "../contexts/AuthContext";
import { SearchEventController } from "../controllers/SearchEventController";
import { SearchUserController } from "../controllers/SearchUserController";
import { CategoriesController } from "../controllers/CategoriesController";
import { EventModel } from "../models/EventModel";
import { UserModel } from "../models/UserModel";
import { CategoryModel } from "../models/CategoryModel";
import { IMAGE_PLACEHOLDER } from "../utils/consts";
import { Loading } from "../components/Loading/Loading";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import { useTranslation } from "react-i18next";
import { NotificationType } from "../components/NotificationItem/NotificationItem";
import { NotificationsController } from "../controllers/NotificationsController";
import { CommentEventController } from "../controllers/CommentEventController";
import { ProfileController } from "../controllers/ProfileController";
import { ShareEventController } from "../controllers/ShareEventController";
import { LikeEventController } from "../controllers/LikeEventController";

export enum SearchTabsEnum {
  EVENTS = "Eventos",
  ACCOUNTS = "Cuentas",
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function SearchView() {
  const { t , i18n } = useTranslation();
  const history = useHistory();
  const { session, user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>(SearchTabsEnum.EVENTS);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<EventModel[] | null>(null);
  const [allEvents, setAllEvents] = useState<EventModel[] | null>(null);
  const [users, setUsers] = useState<UserModel[] | null>(null);
  const [categories, setCategories] = useState<CategoryModel[] | null>(null);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [userComment, setUserComment] = useState<{
    username: string;
    profileImage: string;
  }>({
    username: "",
    profileImage: IMAGE_PLACEHOLDER,
  });
  const [isSearching, setIsSearching] = useState(false);

  const searchTabs = [
    { id: SearchTabsEnum.EVENTS, label: t("search.tabs.events") },
    { id: SearchTabsEnum.ACCOUNTS, label: t("search.tabs.accounts") },
  ];

  const debouncedSearchTerm = useDebounce(search, 500);

  useEffect(() => {
    async function fetchInitialData() {
      if (!session) return;
      try {
        const categoriesData = await CategoriesController.getCategories(
          session.access_token
        );
        setCategories(categoriesData);

        const profile = await ProfileController.getProfile(
          session.access_token,
          user?.id || ""
        );
        setUserComment({
          username: profile.username,
          profileImage: profile.profileImage || IMAGE_PLACEHOLDER,
        });
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInitialData();
  }, [session, user]);

  useEffect(() => {
    async function performSearch() {
    setIsSearching(true);
      if (!session || !user || debouncedSearchTerm.length === 0) {
        setAllEvents(null);
        setUsers(null);
        return;
      }

      setEvents(null);
      setUsers(null);

      try {
        if (activeTab === SearchTabsEnum.EVENTS) {
          const results = await SearchEventController.searchEvents(
            session.access_token,
            debouncedSearchTerm,
            user.id
          );
          setAllEvents(results);
        } else {
          const results = await SearchUserController.searchUsers(
            session.access_token,
            debouncedSearchTerm
          );
          setUsers(results);
        }
      } catch (error) {
        console.error("Error in search:", error);
      } finally {
        setIsSearching(false);
      }
    }

    performSearch();
  }, [debouncedSearchTerm, activeTab]);

  useEffect(() => {
    if (allEvents) {
      const filteredEvents = allEvents.filter(
        (event) =>
          activeCategories.length === 0 ||
          activeCategories.includes(event.categoryId.toString())
      );
      setEvents(filteredEvents);
    }
  }, [activeCategories, allEvents]);

  const handleLike = async (
    eventId: string,
    eventImage: string,
    toUserId: string,
    isLiked: boolean
  ) => {
    if (!session || !user) return;

    try {
      setEvents(
        (currentEvents) =>
          currentEvents?.map((event) =>
            event.eventId === eventId
              ? { ...event, isLiked: !event.isLiked }
              : event
          ) || null
      );

      const result = await LikeEventController.likeEvent(
        session.access_token,
        eventId,
        user.id
      );

      if (!isLiked) {
        const notificationData = {
          fromUserId: user.id,
          toUserId: toUserId,
          type: NotificationType.LIKE_EVENT,
          message: t("notifications.LIKE"),
          eventImage: eventImage,
        };
        await NotificationsController.createNotification(
          session.access_token,
          notificationData
        );
      }

      if (result.isActive) {
        setEvents(
          (currentEvents) =>
            currentEvents?.map((event) =>
              event.eventId === eventId
                ? { ...event, isLiked: result.isActive }
                : event
            ) || null
        );
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const fetchComments = async (eventId: string) => {
    if (!session) return [];
    try {
      return await CommentEventController.getEventComments(
        session.access_token,
        eventId
      );
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };

  const onComment = async (
    eventId: string,
    comment: string,
    eventImage: string
  ) => {
    if (!session || !user) return;

    try {
      await CommentEventController.createComment(
        session.access_token,
        eventId,
        {
          userId: user.id,
          text: comment,
        }
      );

      const toUserId = await ProfileController.getUserId(
        session.access_token,
        eventId
      );

      const notificationData = {
        fromUserId: user.id,
        toUserId: toUserId.data,
        type: NotificationType.COMMENT_EVENT,
        message: t("notifications.COMMENT"),
        eventImage: eventImage,
      };

      await NotificationsController.createNotification(
        session.access_token,
        notificationData
      );
    } catch (error) {
      console.error("Error commenting:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <IonPage>
      <AppHeader />
      <IonContent>
        <div className="search-view-container">
          <SearchBar value={search} onChange={setSearch} />
          <Tabs
            tabs={searchTabs}
            onTabChange={(tab: Tab) => setActiveTab(tab.id)}
          />
        </div>
        {activeTab === SearchTabsEnum.EVENTS && categories && (
          <Pills
            pills={categories.map((category) => ({
              id: category.id.toString(),
              label: i18n.language === "es-ES" ? category.nameEs : category.nameEn,
            }))}
            onSelectCategories={setActiveCategories}
          />
        )}

        {search.length > 0 ? (
          isSearching ? (
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            <>
              {activeTab === SearchTabsEnum.EVENTS ? (
                <>
                  {events && events.length > 0 ? (
                    <div className="events-content-container">
                      <IonList>
                        {events.map((event) => (
                          <EventCard
                            key={event.eventId}
                            {...event}
                            handleLike={() =>
                              handleLike(
                                event.eventId,
                                event.eventImage,
                                event.userId,
                                event.isLiked
                              )
                            }
                            onComment={onComment}
                            onShare={() =>
                              ShareEventController.shareEvent(
                                t("common.share_message", {
                                  eventName: event.title,
                                  eventDate: event.date,
                                })
                              )
                            }
                            onPressUser={() =>
                              history.push(
                                ROUTES.SEARCH.PROFILE_DETAILS.replace(
                                  ":userId",
                                  event.userId
                                )
                              )
                            }
                            onMoreDetails={() =>
                              history.push(
                                ROUTES.SEARCH.EVENT_DETAILS.replace(
                                  ":eventId",
                                  event.eventId
                                )
                              )
                            }
                            fetchComments={() => fetchComments(event.eventId)}
                            userComment={userComment}
                          />
                        ))}
                      </IonList>
                    </div>
                  ) : (
                    <div className="no-results-container">
                      <IonText className="no-results-text">
                        {t("search.no_events_found")}
                      </IonText>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {users && users.length > 0 ? (
                    <div className="users-content-container">
                      {users.map((user) => (
                        <UserCard
                          key={user.userId}
                          username={user.username}
                          profileImage={user.profileImage || IMAGE_PLACEHOLDER}
                          onPressButton={() => {}}
                          onPressUser={() =>
                            history.push(
                              ROUTES.SEARCH.PROFILE_DETAILS.replace(
                                ":userId",
                                user.userId
                              )
                            )
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="no-results-container">
                      <IonText className="no-results-text">
                        {t("search.no_users_found")}
                      </IonText>
                    </div>
                  )}
                </>
              )}
            </>
          )
        ) : (
          <div className="no-results-container">
            <IonText className="hint-text">
              {t(
                activeTab === SearchTabsEnum.EVENTS
                  ? "search.search_events"
                  : "search.search_users"
              )}
            </IonText>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
