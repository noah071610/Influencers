import { configureStore, getDefaultMiddleware, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper, MakeStore, HYDRATE } from "next-redux-wrapper";
import { Action } from "redux";
import { reducer } from "slices";

const makeStore = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: getDefaultMiddleware(),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});
