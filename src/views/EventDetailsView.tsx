import { IonIcon, IonPage } from "@ionic/react";

import { IonContent } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useHistory } from "react-router-dom";
import { EventCard } from "../components/EventCard/EventCard";

export function EventDetailsView() {
    const history = useHistory();
    return (
        <IonPage>
            <AppHeader title="Detalles del evento" goBack={() => history.goBack()}/>
            <IonContent>
                <EventCard
                    eventId="1"
                    profileImage="https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE//defaultProfile.jpg"
                    username="John Doe"
                    eventImage="https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg"
                    title="Evento de prueba"
                    description="Descripción del evento"
                    date="2024-01-01"
                    latitude="19.432607"
                    longitude="-99.133209"
                    startsAt="2024-01-01"
                    category="Música"
                    musicUrl="https://via.placeholder.com/150"
                    userComment={{ username: "John Doe", profileImage: "https://via.placeholder.com/150" }}
                    onPressUser={() => {}}
                    onComment={() => Promise.resolve()}
                    onShare={() => {}}
                    variant="details"
                    fetchComments={() => Promise.resolve([])}
                    handleLike={() => {}}
                    isLiked={false}
                />
            </IonContent>
        </IonPage>
    )
}
