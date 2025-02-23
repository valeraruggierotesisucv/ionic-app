import { IonContent, IonPage } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useHistory } from "react-router-dom";

export function EditEventView() {
    const history = useHistory();
    return (
        <IonPage>
            <AppHeader title="Edit Event" goBack={() => history.goBack()} />
            <IonContent>
                <div className="edit-event-container">
                    <h1>Edit Event</h1>
                </div>
            </IonContent>
        </IonPage>
    );
}
