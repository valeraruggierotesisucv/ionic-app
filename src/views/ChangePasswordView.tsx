import { IonContent, IonPage } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useHistory } from "react-router-dom";
import { ButtonVariant } from "../components/Button/Button";
import { ButtonSize } from "../components/Button/Button";
import { InputFieldVariant } from "../components/InputField/InputField";
import { InputField } from "../components/InputField/InputField";
import { Button } from "../components/Button/Button";
import { useState } from "react";
import "./changePasswordView.css";

export function ChangePasswordView() {
    
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();
    return (
        <IonPage>
            <AppHeader title="Cambiar contraseña" goBack={() => history.goBack()}/>
            <IonContent className="ion-padding">
            <div className="change-password-container">
                
                    <div className="inputs-container">
                        <InputField 
                            label="Nueva contraseña"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            variant={InputFieldVariant.GRAY_BACKGROUND}
                        />
                        <InputField 
                            label="Confirmar contraseña"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            variant={InputFieldVariant.GRAY_BACKGROUND}
                        />
                    </div>
                    <div className="button-container">
                        <Button 
                            label="Enviar"
                            size={ButtonSize.LARGE}
                            variant={ButtonVariant.PRIMARY}
                        />
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}
