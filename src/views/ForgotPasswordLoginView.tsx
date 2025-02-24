import { IonContent, IonImg, IonPage } from '@ionic/react';
import { AppHeader } from "../components/AppHeader/AppHeader";
import { Button, ButtonSize, ButtonVariant } from '../components/Button/Button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import successImage from '../../public/images/Success.png';
import '../styles/forgotPasswordLoginView.css';

export function ForgotPasswordLoginView() {
    const history = useHistory();

    return (
        <IonPage>
            <AppHeader/>
            <IonContent>
                <div className="forgot-password-container">
                    <div className="success-content">
                        <h2>¡Correo enviado con éxito!</h2>
                        <div className="image-container">
                            <IonImg src={successImage} alt="Success" />
                        </div>
                        <p className="forgot-password-description">
                            {`Por favor, verifica tu bandeja de entrada y sigue el enlace para cambiar tu contraseña.\nNo olvides revisar la carpeta de spam si no lo encuentras.`}
                        </p>
                    </div>

                    <div className="button-container">
                        <Button
                            label="Iniciar Sesión"
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
