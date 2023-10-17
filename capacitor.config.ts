import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'aimalls-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
