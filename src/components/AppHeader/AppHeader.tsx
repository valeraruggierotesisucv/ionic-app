import { IonHeader, IonIcon, IonToolbar } from '@ionic/react';
import { chevronBackOutline, settingsOutline } from 'ionicons/icons';
import './AppHeader.css';

interface AppHeaderProps {
  title?: string;
  goBack?: () => void;
  goToConfig?: () => void;
}

export function AppHeader({ title, goBack, goToConfig }: AppHeaderProps) {
  return (
    <IonHeader className="ion-no-border">
    <IonToolbar>
    <header className="app-header">
      <div className="left-container">
        {goBack && (
          <button onClick={goBack} className="icon-button">
            <IonIcon 
              icon={chevronBackOutline} 
              style={{ 
                width: '24px', 
                height: '24px', 
                color: 'black' 
              }}
            />
          </button>
        )}
      </div>
      <div className="center-container">
        {title ? (
          <h1 className="title">{title}</h1>
        ) : (
          <img
            src="/images/EventifyTextLogo.png"
            alt="Eventify"
            className="logo"
          />
        )}
      </div>
      <div className="right-container">
        {goToConfig && (
          <button onClick={goToConfig} className="icon-button">
            <IonIcon 
              icon={settingsOutline} 
              style={{ 
                width: '24px', 
                height: '24px', 
                color: 'black' 
              }}
            />
          </button>
        )}
      </div>
    </header>

    </IonToolbar>
    </IonHeader>
  );
}
