import Lenis from "@studio-freight/lenis";
import { create } from "zustand";

type Store = {
  lenis: Lenis | null;
  setLenis: (lenis: any) => void;
};

const useStore =  create<Store>((set, get) => ({
  // state
  lenis: null,
  setLenis: (lenis: any) => set({ lenis }),
}));

export default useStore;