import { create } from 'zustand';
import { alertClass } from './types/todo';

type jwtStore = {
  jwtToken: string;
  setLoginJwtToken: (jwtToken: string) => void;
  setLogoutJwtToken: () => void;
};

export const useJwtStore = create<jwtStore>((set) => ({
  jwtToken: localStorage.getItem('jwtToken') || "",
  setLoginJwtToken: (jwtToken: string) => {
    localStorage.setItem('jwtToken', jwtToken);
    set((state) => ({ jwtToken: state.jwtToken = jwtToken }));
  },
  setLogoutJwtToken: () => {
    localStorage.removeItem('jwtToken');
    set((state) => ({ jwtToken: state.jwtToken = "" }));
  },
}));

type userStore = {
  userName: string;
  userID: number;
  setLoginUserName: (user: string) => void;
  setLogoutUserName: () => void;
  setLoginUserID: (userID: number) => void;
  setLogoutUserID: () => void;
};

export const useUserStore = create<userStore>((set) => ({
  userName: localStorage.getItem('userName') || "",
  userID: parseInt(localStorage.getItem('userID') || '0', 10),
  setLoginUserName: (userName: string) => {
    localStorage.setItem('userName', userName);
    set((state) => ({ userName: state.userName = userName }));
  },
  setLogoutUserName: () => {
    localStorage.removeItem('userName');
    set((state) => ({ userName: state.userName = "" }));
  },
  setLoginUserID: (userID: number) => {
    localStorage.setItem('userID', userID.toString());
    set((state) => ({ userID: state.userID = userID }));
  },
  setLogoutUserID: () => {
    localStorage.removeItem('userID');
    set((state) => ({ userID: state.userID = 0 }));
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
  setAlertClass: (alertClass: alertClass) => void;
};

export const useAlertStore = create<alertStore>((set) => ({
  alertTitle: "",
  alertMessage: "",
  alertClass: "alert-danger",
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
