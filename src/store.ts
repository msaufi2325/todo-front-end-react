import { create } from 'zustand';

type jwtStore = {
  jwtToken: string;
  setLoginJwtToken: () => void;
  setLogoutJwtToken: () => void;
};

export const useJwtStore = create<jwtStore>((set) => ({
  jwtToken: "jwttoken",
  setLoginJwtToken: () => {
    set((state) => ({ jwtToken: state.jwtToken = "jwttoken" }));
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
