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
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>(''); 

  const [showLoading, hideLoading] = useIonLoading();
  const [showToast ] = useIonToast();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log("Form submitted with:", {
      email: email,
      password: password,
      emailLength: email.length,
      passwordLength: password.length
    });

    if (!email || !password) {
      await showToast({ 
        message: 'Please enter both email and password', 
        duration: 3000 
      });
      return;
    }

    await showLoading();
    try {
      await login(email, password);
    } catch (e: any) {
      await showToast({ 
        message: e.error_description || e.message, 
        duration: 5000 
      });
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
                onIonInput={(e) => {
                  
                  setEmail(e.detail.value?.toString() || '');
                }}
                type="email"
                required
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput
                value={password}
                name="password"
                onIonInput={(e) => {
                  setPassword(e.detail.value?.toString() || '');
                }}
                type="password"
                required
              ></IonInput>
            </IonItem>
            <div className="ion-text-center ion-padding">
              <IonButton type="submit" expand="block">
                Login
              </IonButton>
            </div>
          </form>
        </IonList>
      </IonContent>
    </IonPage>
  );
}