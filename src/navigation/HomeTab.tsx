import React from 'react';
import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import { HomeView } from '../views/HomeView';
import { EventDetailsView } from '../views/EventDetailsView';

const HomeTab: React.FC = () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route 
          exact 
          path={ROUTES.HOME.ROOT} 
          component={HomeView} 
        />
        <Route 
          exact 
          path={ROUTES.HOME.EVENT_DETAILS} 
          component={EventDetailsView} 
        />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default HomeTab;
