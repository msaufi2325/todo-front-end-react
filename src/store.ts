import { create } from 'zustand';
import { alertClass } from './types/todo';

type jwtStore = {
  jwtToken: string;
  setLoginJwtToken: (jwtToken: string) => void;
  setLogoutJwtToken: () => void;
};

export const useJwtStore = create<jwtStore>((set) => ({
  jwtToken: "",
  setLoginJwtToken: (jwtToken: string) => {
    set((state) => ({ jwtToken: state.jwtToken = jwtToken}));
  },
  setLogoutJwtToken: () => {
    set((state) => ({ jwtToken: state.jwtToken = "" }));
  },
}));

type showDeletedStore = {
  showDeleted: boolean;
  setShowDeleted: (value: boolean) => void;
};

export const useShowDeletedStore = create<showDeletedStore>((set) => ({
  showDeleted: false,
  setShowDeleted: (value) => {
    set((state) => ({ showDeleted: state.showDeleted = value }));
  },
}));

type alertStore = {
  alertTitle: string;
  alertMessage: string;
  alertClass: alertClass;
  setAlertTitle: (title: string) => void;
  setAlertMessage: (message: string) => void;
};

export const useAlertStore = create<alertStore>((set) => ({
  alertTitle: "",
  alertMessage: "",
  alertClass: "alert-info",
  setAlertTitle: (title: string) => {
    set((state) => ({ alertTitle: state.alertTitle = title }));
  },
  setAlertMessage: (message: string) => {
    set((state) => ({ alertMessage: state.alertMessage = message }));
  },
  setAlertClass: (alertClass: alertClass) => {
    set((state) => ({ alertClass: state.alertClass = alertClass }));
  },
}));
