import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AuthProvider } from './contexts/AuthContext';
import { PushNotificationProvider } from './contexts/PushNotificationsContext';

defineCustomElements(window);
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <PushNotificationProvider>
        <App />
      </PushNotificationProvider>      
    </AuthProvider>
  </React.StrictMode>
);