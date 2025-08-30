import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { useAuthStore } from '../app.state';

export function loginCognito(data: {
    email: string;
    password: string;
}): Promise<CognitoUser> {
  const { email, password } = data;
  return Auth.signIn(email, password);
}

export function getCurrentUserSession(): Promise<void | CognitoUserSession> {
  return Auth.currentSession().catch((err) => console.log(err));
}

export function logoutCognito() {
  return Auth.signOut();
}

export function getCurrentUserAccessToken() {
  return useAuthStore
    .getState()
    .user
    ?.getSignInUserSession()
    ?.getIdToken()
    .getJwtToken();
}
