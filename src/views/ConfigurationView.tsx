import { IonContent, IonPage } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useAuth } from "../contexts/AuthContext";
import Input, { InputVariant } from "../components/Input/Input";
import { DisplayInput } from "../components/DisplayInput/DisplayInput";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import { CustomModal } from "../components/CustomModal/CustomModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/configurationView.css";

export function ConfigurationView() {
    const history = useHistory();
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const {logout} = useAuth();
    const {t, i18n} = useTranslation();

    const handleLanguageSelect = (language: string) => {
        i18n.changeLanguage(language);
        setShowLanguageModal(false);
    };
    return (
        <IonPage>
            <AppHeader title={t("configuration.title")} goBack={() => history.goBack()}/>
            <IonContent >
                <div className="configuration-view-content">
                    <Input
                        label={t("configuration.language")}
                        required={false}
                        variant={InputVariant.ARROW}
                        onPress={() => setShowLanguageModal(true)}
                    />
                    <Input
                        label={t("configuration.change_password")}
                        required={false}
                        onPress={() => history.push(ROUTES.PROFILE.CHANGE_PASSWORD)}
                        variant={InputVariant.ARROW}
                    />
                    <DisplayInput
                        label={t("configuration.logout")}
                        onPress={() => logout()}
                    />
                </div>

                <CustomModal
                    isOpen={showLanguageModal}
                    onClose={() => setShowLanguageModal(false)}
                >
                    <div className="language-modal-content">
                        <h1>{t("configuration.changeLanguage")}</h1>
                        <div className="language-options">
                            <button className="language-button" onClick={() => handleLanguageSelect('es-ES')}>Español</button>
                            <button className="language-button" onClick={() => handleLanguageSelect('en-US')}>English</button>
                        </div>
                    </div>
                </CustomModal>
            </IonContent>
        </IonPage>
    );
}
