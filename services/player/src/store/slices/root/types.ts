import { DefaultPayload, ErrorPayload, WithoutPayload } from "../../types";

export type State =
  | "IDLE"
  | "DO_INIT"
  | "INIT_PENDING"
  | "INIT_RESOLVE"
  | "RENDER"
  | "DO_PLAYER_INIT"
  | "PLAYER_INIT_PENDING"
  | "SET_SOURCE"
  | "SET_SOURCE_SUCCESS"
  | "READY";

export type EventsWithPayload = WithoutPayload<
  | "DO_INIT"
  | "INIT_RESOLVE"
  | "DO_PLAYER_INIT"
  | "PLAYER_INIT_RESOLVE"
  | "SET_SOURCE_SUCCESS"
>;
// | ErrorPayload<"INIT_REJECTED" | "PLAYER_INIT_REJECT">;
// | {
//     type: "INIT_RESOLVE";
//     payload: { session: SessionState; deviceInfo: DeviceInfo };
//   }

export type Event = EventsWithPayload["type"];

export type FSMState = {
  step: State;
  isInited: boolean;
  isShowUI: boolean;
};

export type ActionPayload = DefaultPayload<Event> & EventsWithPayload;
