import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonLoading,
} from '@ionic/react';

import { useAuth } from '../contexts/AuthContext';


export function AuthView() {
  const { login, signup} = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

  const [showLoading, hideLoading] = useIonLoading();
  const [showToast ] = useIonToast();
console.log("authView"); 
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("email: ", email); 
    console.log("password: ", password); 
    e.preventDefault();
    await showLoading();
    try {
      login(email, password); 
    } catch (e: any) {
      await showToast({ message: e.error_description || e.message , duration: 5000});
    } finally {
      await hideLoading();
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        
        <IonList inset={true}>
          <form onSubmit={handleLogin}>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                value={email}
                name="email"
                onIonChange={(e) => setEmail(e.detail.value ?? '')}
                type="email"
              ></IonInput>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput
                value={password}
                name="password"
                onIonChange={(e) => setPassword(e.detail.value ?? '')}
                type="text"                
              ></IonInput>
            </IonItem>
            <div className="ion-text-center">
              <IonButton type="submit" fill="clear">
                Login
              </IonButton>
            </div>
          </form>
        </IonList>
      </IonContent>
    </IonPage>
  );
}