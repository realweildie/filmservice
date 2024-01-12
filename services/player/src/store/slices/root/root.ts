import { createAction, createSlice } from "@reduxjs/toolkit";
import { AppEvent, EventPayload, FSMConfig } from "../../types";
import { FSMState, State } from "./types";
import { isStepChange, startListening } from "../../middleware";
import { FSM_EVENT, sendEvent } from "../../action";
import { initPlayer } from "./effects/initPlayer";
import { setPLayerSource } from "./effects/setSource";

const config: FSMConfig<State, AppEvent> = {
  IDLE: {
    DO_INIT: "INIT_PENDING",
  },
  INIT_PENDING: {
    INIT_RESOLVE: "RENDER",
  },
  RENDER: {
    DO_PLAYER_INIT: "PLAYER_INIT_PENDING",
  },
  PLAYER_INIT_PENDING: {
    PLAYER_INIT_RESOLVE: "SET_SOURCE",
  },
  SET_SOURCE: {
    SET_SOURCE_SUCCESS: "READY",
  },
  READY: {},
};

const initialState: FSMState = {
  step: "IDLE",
  isInited: false,
  isShowUI: false,
};

const root = createSlice({
  name: "root",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAction<EventPayload>(FSM_EVENT), (state, action) => {
      const { type, payload, meta } = action.payload;

      const next = config[state.step]?.[type];
      const step = next || state.step;

      switch (type) {
        case "DO_INIT":
          state.step = step;
          break;
        case "INIT_RESOLVE":
          state.step = step;
          state.isShowUI = true;
          break;
        default:
          return { ...state, step, ...payload };
      }
    });
  },
});

const addMiddleware = () =>
  startListening({
    predicate: (action, currentState, prevState) => {
      const res = isStepChange(prevState, currentState, root.name);
      // we just check here if the state is changed
      //   console.log(
      //     `${prevState.root.step} => ${currentState.root.step} ===> ${res}`
      //   );
      return res;
    },
    effect: (action, api) => {
      // we actualy make some effect here by switch
      const {
        getState,
        extra: { services, createDispatch },
      } = api;

      const dispatch = createDispatch({
        getState,
        dispatch: api.dispatch,
      });

      // use it in actions with Payload
      const opts = {
        dispatch,
        getState,
        services,
      };

      const { step } = getState().root;

      const handler: { [key in State]?: () => Promise<void> | void } = {
        // we make here some side effect to trigger another machines, like to init add

        // it triggers in the moment when we set new step in state !!!

        INIT_PENDING: () => {
          // some initial thnigs like get data from visitor
          // a skip it because i have no real data yet
          //   dispatch(
          //     sendEvent({
          //       type: "INIT_PENDING",
          //     })
          //   );

          console.log("EFFECT IN THE MOMENT IDLE => INIT_PENDING");

          // we gonna resolve it by default now
          // there are no error to reject yet
          dispatch(
            sendEvent({
              type: "INIT_RESOLVE",
            })
          );
        },

        PLAYER_INIT_PENDING: () => initPlayer(opts),
        SET_SOURCE: () => setPLayerSource(opts),
      };

      const effect = handler[step];

      if (effect) {
        effect();
      }
    },
  });

export default { ...root, config, addMiddleware };
