import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, addCircle, notifications, person, search, list } from 'ionicons/icons';
import HomeTab from './navigation/HomeTab';
import AddTab from './navigation/AddTab';
import NotificationsTab from './navigation/NotificationsTab';
import ProfileTab from './navigation/ProfileTab';
import i18n from '../i18n'
// Import SearchTab if you have it
// import SearchTab from './navigation/SearchTab';
import { ROUTES } from './utils/routes';
import ErrorBoundary from './components/ErrorBoundary';
import { ForgotPasswordView } from './views/ForgotPasswordView';
import { ForgotPasswordLoginView } from './views/ForgotPasswordLoginView';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SearchTab from './navigation/SearchTab';
import { useAuth } from './contexts/AuthContext';
import { AuthView } from './views/AuthView';
import { useState } from 'react';
import { useEffect } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const { user } = useAuth(); 
  
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    i18n.init().then(() => {
      setIsI18nInitialized(true);
    }).catch((error: any) => {
      console.error("i18n initialization failed", error);
    });
  }, []);

  if (!isI18nInitialized) {
    return null;
  }

  return(
    <ErrorBoundary>
    <IonApp>
      <IonReactRouter>
        <Route exact path="/">
          {user ? <Redirect to={ROUTES.HOME.ROOT} /> : <AuthView />}
        </Route>
        
        {!user && (
          <>
            <Route path={ROUTES.AUTH.FORGOT_PASSWORD} component={ForgotPasswordView} />
            <Route path={ROUTES.AUTH.FORGOT_PASSWORD_LOGIN} component={ForgotPasswordLoginView} />
          </>
        )}

        {user ? (
          <IonTabs>
            <IonRouterOutlet>
              <Route path={ROUTES.HOME.ROOT} component={HomeTab} />
              <Route path={ROUTES.NOTIFICATIONS.ROOT} component={NotificationsTab} />
              <Route path={ROUTES.ADD.ROOT} component={AddTab} />
              <Route path={ROUTES.PROFILE.ROOT} component={ProfileTab} />
              <Route path={ROUTES.SEARCH.ROOT} component={SearchTab} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href={ROUTES.HOME.ROOT}>
                <IonIcon icon={home} />
              </IonTabButton>
              <IonTabButton tab="search" href={ROUTES.SEARCH.ROOT}>
                <IonIcon icon={search} />
              </IonTabButton>
              <IonTabButton tab="add" href={ROUTES.ADD.ROOT}>
                <IonIcon icon={addCircle} />
              </IonTabButton>
              <IonTabButton tab="notifications" href={ROUTES.NOTIFICATIONS.ROOT}>
                <IonIcon icon={notifications} />
              </IonTabButton>
              <IonTabButton tab="profile" href={ROUTES.PROFILE.ROOT}>
                <IonIcon icon={person} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        ) : (
          <Route path="*">
            <Redirect to="/" />
          </Route>
        )}
      </IonReactRouter>
    </IonApp>
    </ErrorBoundary>
  );
};

export default App;
