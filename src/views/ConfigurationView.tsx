import { IonContent, IonPage } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useAuth } from "../contexts/AuthContext";
import Input, { InputVariant } from "../components/Input/Input";
import { DisplayInput } from "../components/DisplayInput/DisplayInput";
import "./configurationView.css";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../utils/routes";


export function ConfigurationView() {
    const history = useHistory();
    const {logout} = useAuth();
    return (
        <IonPage>
            <AppHeader title="Configuración" goBack={() => history.goBack()}/>
            <IonContent >
                <div className="configuration-view-content">
                    <Input
                        label="IDIOMA"
                        placeholder="Español"
                        required={false}
                        variant={InputVariant.ARROW}
                    />
                    <Input
                        label="CAMBIAR CONTRASEÑA"
                        required={false}
                        onPress={() => history.push(ROUTES.PROFILE.CHANGE_PASSWORD)}
                        variant={InputVariant.ARROW}
                    />
                    <DisplayInput
                        label="CERRAR SESIÓN"
                        onPress={() => logout()}
                    />
                </div>
            </IonContent>
        </IonPage>
    );
}
