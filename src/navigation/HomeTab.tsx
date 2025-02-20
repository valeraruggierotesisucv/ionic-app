import React from 'react';
import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import { HomeView } from '../views/HomeView';
import { DetailsView } from '../views/DetailsView';

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
          path={ROUTES.HOME.DETAIL} 
          component={DetailsView} 
        />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default HomeTab;
