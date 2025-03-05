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
import { ROUTES } from './utils/routes';
import ErrorBoundary from './components/ErrorBoundary';
import { ForgotPasswordView } from './views/ForgotPasswordView';
import { ForgotPasswordLoginView } from './views/ForgotPasswordLoginView';
import { SplashScreen } from '@capacitor/splash-screen';
import { useAuth } from './contexts/AuthContext';
import { AuthView } from './views/AuthView';
import { useState, useEffect } from 'react';
import { OnBoardingView } from './views/OnboardingView';
import { Loading } from './components/Loading/Loading';
import SearchTab from './navigation/SearchTab';
import { initPromise } from '../i18n';

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

setupIonicReact();

const App: React.FC = () => {
  const { user } = useAuth(); 
  
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await SplashScreen.show();
        
        // Wait for i18n to be fully initialized
        await initPromise;
        setIsI18nInitialized(true);
        
        await SplashScreen.hide();
      } catch (error) {
        console.error("App initialization failed", error);
        await SplashScreen.hide();
      }
    };

    initializeApp();
  }, []);

  if (!isI18nInitialized) {
    return null;
  }

  return(
    <ErrorBoundary>
    <IonApp>
      <IonReactRouter>
        <Route exact path="/">
          {user ? <Redirect to={ROUTES.HOME.ROOT} /> : <OnBoardingView />}
        </Route>
        
        {!user && (
          <>
            <Route path={ROUTES.AUTH.FORGOT_PASSWORD} component={ForgotPasswordView} />
            <Route path={ROUTES.AUTH.AUTH} component={AuthView} />
            <Route path={ROUTES.AUTH.FORGOT_PASSWORD_LOGIN} component={ForgotPasswordLoginView} />
            <Route path={ROUTES.AUTH.ONBOARDING} component={OnBoardingView} />
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
