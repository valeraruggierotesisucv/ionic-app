import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.expo.eventify',
  appName: 'Eventify',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }, 
  "plugins":{
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  }
};

export default config;
