import { configureStore } from "@reduxjs/toolkit";
import { forkSlice } from "./slices/forkSlice";
import { forkService } from "../services/forkService";

export const makeStore = () => {
  return configureStore({
    reducer: {
      forkSlice: forkSlice.reducer,
      forkService: forkService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(forkService.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
