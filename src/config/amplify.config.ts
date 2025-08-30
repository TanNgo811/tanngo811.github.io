import { Amplify } from 'aws-amplify';

function setupAmplifyConfig() {
  return Amplify.configure({
    Auth: {
      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: process.env.VITE_COGNITO_IDENTITYPOOLID,
      // REQUIRED - Amazon Cognito Region
      region: process.env.VITE_COGNITO_REGION,
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: process.env.VITE_COGNITO_USERPOOLID,
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: process.env.VITE_COGNITO_USERPOOLWEBCLIENTID,
      // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
      authenticationFlowType: 'USER_SRP_AUTH',
      domain: process.env.VITE_COGNITO_DOMAIN,
    },
  });
}
export default setupAmplifyConfig;
