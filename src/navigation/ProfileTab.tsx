import React from 'react';
import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import { Button } from '../components/Button/Button';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../utils/routes';
import { Route } from 'react-router-dom';
import { ProfileView } from '../views/ProfileView';
import { EditProfileView } from '../views/EditProfileView';

const ProfileTab: React.FC = () => {
  const { logout } = useAuth(); 
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route 
          exact 
          path={ROUTES.PROFILE.ROOT} 
          component={ProfileView} 
        />
        <Route 
          exact 
          path={ROUTES.PROFILE.EDIT} 
          component={EditProfileView} 
        />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default ProfileTab; 