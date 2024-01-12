import { createAction, createSlice } from "@reduxjs/toolkit";
import { AppEvent, EventPayload, FSMConfig } from "../../types";
import { FSMState, State } from "./types";
import { startListening } from "../../middleware";
import { FSM_EVENT } from "../../action";

const config: FSMConfig<State, AppEvent> = {
  IDLE: {
    DO_INIT: "INIT_PENDING",
  },
  INIT_PENDING: {
    INIT_RESOLVE: "INITIALIZED",
    INIT_REJECTED: "ERROR",
  },
  INITIALIZED: {
    // i have no config yet
    // PARSE_CONFIG: "READY",
    SET_SOURCE: "READY",
  },
  READY: {},
  ERROR: {},
};

const initialState: FSMState = {
  step: "IDLE",
};

const root = createSlice({
  name: "root",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAction<EventPayload>(FSM_EVENT), (state, action) => {
      console.log(action, state);
    });
  },
});

const addMiddleware = () =>
  startListening({
    predicate: (action, currentState, prevState) =>
      prevState.root.step !== currentState.root.step,
    effect: (action, api) => {
      // we actualy make some effect here by switch
      console.log("makeEffect", action);
    },
  });

export default { ...root, config, addMiddleware };
