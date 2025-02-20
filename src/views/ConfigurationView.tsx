import { IonContent, IonPage } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { Button } from "../components/Button/Button";
import { useAuth } from "../contexts/AuthContext";

export function ConfigurationView() {

    const {logout} = useAuth();
    return (
        <IonPage>
            <AppHeader />
            <IonContent>
                <h1>Configuration</h1>
                <Button
                    label="Cerrar Sesión"
                    onClick={() => {
                        logout();
                    }}
                />
            </IonContent>
        </IonPage>
    );
}
