import React from 'react';
import { IonPage, IonRouterOutlet } from '@ionic/react';
import { ROUTES } from '../utils/routes';
import { Route } from 'react-router-dom';
import { SearchView } from '../views/SearchView';
import { EventDetailsView } from '../views/EventDetailsView';
import { ProfileDetailsView } from '../views/ProfileDetailsView';

const SearchTab: React.FC = () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route 
          exact 
          path={ROUTES.SEARCH.ROOT} 
          component={SearchView} 
        />
        <Route 
          exact 
          path={ROUTES.SEARCH.EVENT_DETAILS} 
          component={EventDetailsView} 
        />
        <Route 
          exact 
          path={ROUTES.SEARCH.PROFILE_DETAILS} 
          component={ProfileDetailsView} 
        />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default SearchTab; 