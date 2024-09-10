import { create } from 'zustand';

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
