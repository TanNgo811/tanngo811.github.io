import { Auth } from 'aws-amplify';
import axios from 'axios';
import { useAuthStore, useErrorStore } from '../data-access/app.state';
import { getCurrentUserAccessToken } from '../data-access/auth/auth.api';
export const host_origin = process.env.VITE_API_DOMAIN ?? '';
export const api_path = process.env.VITE_API_PATH ?? '';
export const media_path = process.env.VITE_API_MEDIA ?? '';
export const idp_url = process.env.VITE_API_IDP ?? '';

export const apiCall = axios.create({
  baseURL: host_origin + api_path,
  timeout: 100000,
});

apiCall.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // loading.set((v) => true);
    const currentUserToken = getCurrentUserAccessToken();
    if (currentUserToken && config.headers) {
      config.headers.Authorization = `${currentUserToken}`;
    }
    return config;
  },
  function (error) {
    // loading.set((v) => false);
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiCall.interceptors.response.use(
  function (response) {
    // loading.set((v) => false);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
    function (error) {
        switch (error?.response?.status) {
            case 401:
                alert('This page can only access by admin');
                Auth.signOut();
                useAuthStore.getState().setUser(undefined);
                window.location.href = window.location.origin + '/login';
                break;
            case 403:
                if (error?.response?.data?.message_code === 'message.ip_restrict.deny') {
                    useErrorStore.getState().setError({
                        show: true,
                        code: '401',
                        messageCode: 'message.ip_restrict.deny',
                        title: "IP制限中です",
                        messages: [
                            "許可されたIPからアクセスしてください",
                            "詳しくは管理者にお問合せください",
                        ],
                    });
                    Auth.signOut();
                    useAuthStore.getState().setUser(undefined);
                    break;
                }
                break;
            case 404:
                alert('Page not found');
                window.location.href = window.location.origin + '/error';
                break;
            default:
                break;

        }
        if (error?.code === 'ECONNABORTED') {
            return Promise.reject('Connection error, please try again !');
        }
        // if (!error?.response?.status) {

        // }
        // loading.set((v) => false);
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);