import { IonContent, IonImg, IonPage } from '@ionic/react';
import { Button, ButtonSize, ButtonVariant } from '../components/Button/Button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import Onboarding from '../../public/images/Onboarding.png';
import '../styles/onBoardingView.css';
import { IconLogo } from '../components/IconLogo/IconLogo';
import { useTranslation } from 'react-i18next';

export function OnBoardingView() {
    const history = useHistory();
    const { t } = useTranslation();
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
                        <h1 className="onboarding-title">{t('welcome')}</h1>
                        
                        <div className="button-container">
                            <Button
                                label={t('auth.get_started')}
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
