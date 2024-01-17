import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.aimalls.app',
  appName: 'aimalls-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  ios: {
    // ... additional configuration
    handleApplicationNotifications: false
  }
};

export default config;
