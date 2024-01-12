import { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppState, EventPayload } from ".";

export type CreateDispatchOpts = {
  dispatch: AppDispatch;
  getState: () => AppState;
};

export type SessionDispatch = (action: PayloadAction<EventPayload>) => void;

export const createDispatch = ({
  dispatch,
  getState,
}: CreateDispatchOpts): SessionDispatch => {
  // create dispatch

  return (action) => {
    dispatch(action);
    console.log("[DISPATCH", action);
  };
};
