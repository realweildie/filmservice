import { DefaultPayload, ErrorPayload, WithoutPayload } from "../../types";

export type State =
  | "IDLE"
  | "DO_INIT"
  | "INIT_PENDING"
  | "INIT_RESOLVE"
  | "INIT_REJECTED"
  | "INITIALIZED"
  | "SET_SOURCE"
  | "READY"
  | "ERROR";

export type EventsWithPayload =
  | WithoutPayload<
      | "IDLE"
      | "DO_INIT"
      | "INIT_PENDING"
      | "INIT_RESOLVE"
      | "INIT_REJECTED"
      | "INITIALIZED"
      | "SET_SOURCE"
      | "READY"
      | "ERROR"
    >
  | ErrorPayload<"INIT_REJECTED">;
// | {
//     type: "INIT_RESOLVE";
//     payload: { session: SessionState; deviceInfo: DeviceInfo };
//   }

export type Event = EventsWithPayload["type"];

export type FSMState = {
  step: State;
};

export type ActionPayload = DefaultPayload<Event> & EventsWithPayload;
