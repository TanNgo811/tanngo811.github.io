'use client';

import setupAmplifyConfig from "@/config/amplify.config";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import { create } from 'zustand';

setupAmplifyConfig();

// Define types for the stores
interface AuthState {
  user: CognitoUser | undefined;
  setUser: (user: CognitoUser | undefined) => void;
}

interface DictionaryState {
  dictionary: Record<string, string>;
  setDictionary: (dictionary: Record<string, string>) => void;
}

interface LanguageState {
  currentLang: string;
  setCurrentLang: (lang: string) => void;
}

interface ErrorState {
  error: {
    show: boolean;
    code: string;
    messageCode: string;
    title: string;
    messages: string[];
  } | undefined;
  setError: (error: {
    show: boolean;
    code: string;
    messageCode: string;
    title: string;
    messages: string[];
  } | undefined) => void;
}

interface SnackbarState {
  snackbar: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | undefined;
  setSnackbar: (snackbar: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | undefined) => void;
}

// Create zustand stores
export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));

export const useDictionaryStore = create<DictionaryState>((set) => ({
  dictionary: {},
  setDictionary: (dictionary) => set({ dictionary }),
}));

export const useLanguageStore = create<LanguageState>((set) => ({
  currentLang: 'ja',
  setCurrentLang: (currentLang) => set({ currentLang }),
}));

export const useErrorStore = create<ErrorState>((set) => ({
  error: undefined,
  setError: (error) => set({ error }),
}));

export const useSnackbarStore = create<SnackbarState>((set) => ({
  snackbar: undefined,
  setSnackbar: (snackbar) => set({ snackbar }),
}));

// Initialize auth state
if (
  !Object.keys(localStorage).find((a) =>
    a.startsWith('CognitoIdentityServiceProvider')
  )
) {
  useAuthStore.getState().setUser(undefined);
}

Auth.currentAuthenticatedUser({
  bypassCache: false,
})
  .then((user) => {
    if (user) {
      useAuthStore.getState().setUser(user);
    }
  })
  .catch(() => {
    useAuthStore.getState().setUser(undefined);
  });

// Legacy exports for backward compatibility (deprecated - use hooks instead)
export const authState = {
  get: () => useAuthStore.getState().user,
  set: (value: CognitoUser | undefined | (() => CognitoUser | undefined)) => {
    const newValue = typeof value === 'function' ? value() : value;
    useAuthStore.getState().setUser(newValue);
  }
};

export const dictionary = {
  get: () => useDictionaryStore.getState().dictionary,
  set: (value: Record<string, string> | (() => Record<string, string>)) => {
    const newValue = typeof value === 'function' ? value() : value;
    useDictionaryStore.getState().setDictionary(newValue);
  }
};

export const currentLang = {
  get: () => useLanguageStore.getState().currentLang,
  set: (value: string | (() => string)) => {
    const newValue = typeof value === 'function' ? value() : value;
    useLanguageStore.getState().setCurrentLang(newValue);
  }
};

export const errorState = {
  get: () => useErrorStore.getState().error,
  set: (value: {
    show: boolean;
    code: string;
    messageCode: string;
    title: string;
    messages: string[];
  } | undefined | (() => {
    show: boolean;
    code: string;
    messageCode: string;
    title: string;
    messages: string[];
  } | undefined)) => {
    const newValue = typeof value === 'function' ? value() : value;
    useErrorStore.getState().setError(newValue);
  }
};

export const snackbarState = {
  get: () => useSnackbarStore.getState().snackbar,
  set: (value: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | undefined | (() => {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | undefined)) => {
    const newValue = typeof value === 'function' ? value() : value;
    useSnackbarStore.getState().setSnackbar(newValue);
  }
};