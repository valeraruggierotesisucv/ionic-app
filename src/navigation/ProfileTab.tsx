import React from 'react';
import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import { Button } from '../components/Button/Button';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../utils/routes';
import { Route } from 'react-router-dom';
import { ProfileView } from '../views/ProfileView';
import { EditProfileView } from '../views/EditProfileView';
import { ConfigurationView } from '../views/ConfigurationView';
import { ChangePasswordView } from '../views/ChangePasswordView';
import { FollowedView } from '../views/FollowedView';
import { FollowersView } from '../views/FollowersView';

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
        <Route 
          exact 
          path={ROUTES.PROFILE.CONFIGURATION} 
          component={ConfigurationView} 
        />

        <Route 
          exact 
          path={ROUTES.PROFILE.CHANGE_PASSWORD} 
          component={ChangePasswordView} 
        />
        <Route 
          exact 
          path={ROUTES.PROFILE.FOLLOWED} 
          component={FollowedView} 
        />
        <Route 
          exact 
          path={ROUTES.PROFILE.FOLLOWERS} 
          component={FollowersView} 
        />  
      </IonRouterOutlet>
    </IonPage>
  );
};

export default ProfileTab; 