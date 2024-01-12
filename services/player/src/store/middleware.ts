import {
  CreateListenerMiddlewareOptions,
  TypedStartListening,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import { IServices } from "../interfaces";

import {
  CreateDispatchOpts,
  SessionDispatch,
  createDispatch,
} from "./dispatch";

import playerService from "../services/PlayerService";
import { AppDispatch, AppState } from ".";

type MiddlewareDeps = {
  services: IServices;
  createDispatch: (opts: CreateDispatchOpts) => SessionDispatch;
};

const opts: CreateListenerMiddlewareOptions<MiddlewareDeps> = {
  extra: {
    createDispatch,
    services: {
      playerService,
    },
  },
};

export const listenerMiddleware = createListenerMiddleware(opts);

export type AppStartListening = TypedStartListening<
  AppState,
  AppDispatch,
  MiddlewareDeps
>;

export const startListening =
  listenerMiddleware.startListening as AppStartListening;
