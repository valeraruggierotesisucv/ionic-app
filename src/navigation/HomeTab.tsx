import React from 'react';
import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import Tab1Home from '../views/HomeView';
import Tab1Detail from '../views/DetailsView';

const HomeTab: React.FC = () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route 
          exact 
          path={ROUTES.HOME.ROOT} 
          component={Tab1Home} 
        />
        <Route 
          exact 
          path={ROUTES.HOME.DETAIL} 
          component={Tab1Detail} 
        />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default HomeTab;
