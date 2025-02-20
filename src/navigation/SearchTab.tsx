import React from 'react';
import { IonPage, IonRouterOutlet } from '@ionic/react';
import { ROUTES } from '../utils/routes';
import { Route } from 'react-router-dom';
import { SearchView } from '../views/SearchView';

const SearchTab: React.FC = () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route 
          exact 
          path={ROUTES.SEARCH.ROOT} 
          component={SearchView} 
        />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default SearchTab; 