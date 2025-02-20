import { useState } from 'react';
import { IonContent, IonImg, IonPage } from '@ionic/react';
import { AppHeader } from "../components/AppHeader/AppHeader";
import { InputField } from '../components/InputField/InputField';
import { Button, ButtonSize, ButtonVariant } from '../components/Button/Button';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { mail } from 'ionicons/icons';
import { ROUTES } from '../utils/routes';
import forgotPasswordImage from '../assets/images/SuccessEmail.png';
import './forgotPasswordView.css';

export function ForgotPasswordView() {
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
                <div className="forgot-password-container">
                    <div className="forgot-password-title-container">
                        <h2>¿Olvidaste tu contraseña?</h2>
                        <div className="image-container">
                            <IonImg src={forgotPasswordImage} alt="Forgot Password" />
                        </div>
                        <p className="forgot-password-description">Introduce tu dirección de Correo Electrónico para solicitar el restablecimiento de tu contraseña.</p>
                    </div>
                    <div className="input-section">
                        <InputField
                            label="Correo"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="ejemplo@email.com"
                            icon={mail}
                        />
                    </div>

                    <div className="button-container">
                        <Button
                            label="Enviar enlace"
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
