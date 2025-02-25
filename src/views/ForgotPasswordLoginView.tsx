import { IonContent, IonImg, IonPage } from '@ionic/react';
import { AppHeader } from "../components/AppHeader/AppHeader";
import { Button, ButtonSize, ButtonVariant } from '../components/Button/Button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import successImage from '../../public/images/Success.png';
import '../styles/forgotPasswordLoginView.css';
import { useTranslation } from 'react-i18next';

export function ForgotPasswordLoginView() {
    const history = useHistory();
    const { t } = useTranslation(); 

    return (
        <IonPage>
            <AppHeader/>
            <IonContent>
                <div className="forgot-password-container">
                    <div className="success-content">
                        <h2>{t("auth.send_link_success")}</h2>
                        <div className="image-container">
                            <IonImg src={successImage} alt="Success" />
                        </div>
                        <p className="forgot-password-description">
                            {t("auth.success_email_text")}
                        </p>
                    </div>

                    <div className="forgot-password-login-button-container">
                        <Button
                            label={t("auth.login")}
                            size={ButtonSize.LARGE}
                            variant={ButtonVariant.PRIMARY}
                            onClick={() => history.push(ROUTES.AUTH.ROOT)}
                        />
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}
