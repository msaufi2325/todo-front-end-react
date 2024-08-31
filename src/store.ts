import { create } from 'zustand';

type jwtStore = {
  jwtToken: string;
  setLoginJwtToken: () => void;
  setLogoutJwtToken: () => void;
};

export const useJwtStore = create<jwtStore>((set) => ({
  jwtToken: "",
  setLoginJwtToken: () => {
    set((state) => ({ jwtToken: state.jwtToken = "jwttoken" }));
  },
  setLogoutJwtToken: () => {
    set((state) => ({ jwtToken: state.jwtToken = "" }));
  },
}));
