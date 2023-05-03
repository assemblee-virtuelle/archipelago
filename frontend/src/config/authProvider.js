import { authProvider as semappsAuthProvider } from '@semapps/auth-provider';
import dataProvider from './dataProvider';

const authProvider = semappsAuthProvider({
  dataProvider,
  checkPermissions: true
});

export default authProvider;
