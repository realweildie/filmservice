import { combineReducers, configureStore } from "@reduxjs/toolkit";
import root from "./slices/root/root";
import { listenerMiddleware } from "./middleware";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const rootReducer = combineReducers({
  root: root.reducer,
});

// add extra reducer to listen changes in state for the FIRST
root.addMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export * from "./types";
