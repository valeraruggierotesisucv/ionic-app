import { IonContent, IonImg, IonPage } from '@ionic/react';
import { Button, ButtonSize, ButtonVariant } from '../components/Button/Button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../utils/routes';

import Onboarding from '../../public/images/Onboarding.png';
import './onBoardingView.css';
import { IconLogo } from '../components/IconLogo/IconLogo';

export function OnBoardingView() {
    const history = useHistory();

    return (
        <IonPage>
            <IonContent>
                <div className="onboarding-container">
                    <div className="logo-container">
                        <IconLogo />
                    </div>
                    
                    <div className="image-container">
                        <IonImg src={Onboarding} alt="Events for Everyone" />
                    </div>

                    <div className="onboarding-content-container">
                        <h1 className="onboarding-title">Events for Everyone</h1>
                        
                        <div className="button-container">
                            <Button
                                label="Comenzar"
                                size={ButtonSize.LARGE}
                                variant={ButtonVariant.PRIMARY}
                                onClick={() => history.push(ROUTES.AUTH.AUTH)}
                            />
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}
