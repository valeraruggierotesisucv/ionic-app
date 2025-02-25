import { useState } from 'react';
import { IonContent, IonImg, IonPage } from '@ionic/react';
import { AppHeader } from "../components/AppHeader/AppHeader";
import { InputField } from '../components/InputField/InputField';
import { Button, ButtonSize, ButtonVariant } from '../components/Button/Button';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { mail } from 'ionicons/icons';
import { ROUTES } from '../utils/routes';
import forgotPasswordImage from '../../public/images/SuccessEmail.png';
import '../styles/forgotPasswordView.css';
import { useTranslation } from 'react-i18next';

export function ForgotPasswordView() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const { resetPassword } = useAuth();
    const history = useHistory();

    const handleResetPassword = async () => {
        try {
            await resetPassword(email);
            history.push(ROUTES.AUTH.FORGOT_PASSWORD_LOGIN);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <IonPage>
            <AppHeader 
                goBack={() => history.goBack()} 
            />
            <IonContent >
                <div className="forgot-password-view-container">
                    <div className="forgot-password-title-container">
                        <h2>{t("auth.forgotPassword")}</h2>
                        <div className="image-container">
                            <IonImg src={forgotPasswordImage} alt="Forgot Password" />
                        </div>
                        <p className="forgot-password-description">{t("auth.forgot_password_text")}</p>
                    </div>
                    <div className="input-section">
                        <InputField
                            label={t("auth.email")}
                            value={email}
                            onChangeText={setEmail}
                            placeholder={t("auth.email_placeholder")}
                            icon={mail}
                        />
                    </div>

                    <div className="forgot-password-button-container">
                        <Button
                            label={t("common.send")}
                            size={ButtonSize.LARGE}
                            variant={ButtonVariant.PRIMARY}
                            onClick={handleResetPassword}
                        />
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}
