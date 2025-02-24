import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.expo.eventify',
  appName: 'Eventify',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
