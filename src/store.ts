// store.js
import { createGlobalState, useLocalStorage } from "@vueuse/core";

export const useGlobalState = createGlobalState(() =>
  useLocalStorage<
    {
      pending: string[];
      choosen: string[];
      eliminated: string[];
    }[]
  >("randomizer-store", [])
);
