import { create } from 'zustand';

type jwtStore = {
  jwtToken: string;
  setJwtToken: () => void;
  delJwtToken: () => void;
};

export const useJwtStore = create<jwtStore>((set) => ({
  jwtToken: "",
  setJwtToken: () => {
    set((state) => ({ jwtToken: state.jwtToken = "jwttoken" }));
  },
  delJwtToken: () => {
    set((state) => ({ jwtToken: state.jwtToken = "" }));
  },
}));
