import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Button } from '../components/Button/Button';
import { useAuth } from '../contexts/AuthContext';

const ProfileTab: React.FC = () => {
  const { logout } = useAuth(); 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Button
          label='Cerrar Sesión'
          onClick={logout}
        />
        {/* Profile content goes here */}
      </IonContent>
    </IonPage>
  );
};

export default ProfileTab; 