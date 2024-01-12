import { RawPlayerError } from "../../types/errors";
import * as root from "./slices/root";

export type FSMConfig<S extends string, E extends string> = {
  [state in S]?: {
    [event in E]?: S | null;
  };
};

export type AppEvent = root.Event;

export type EventPayload = root.ActionPayload;

export type WithoutPayload<T> = {
  type: T;
};

export type ErrorPayload<T> = {
  type: T;
  meta: { error: RawPlayerError };
};

export type DefaultPayload<E> = {
  type: E;
  payload?: Record<string, unknown>; // payload попадает в текущий state
  meta?: Record<string, unknown>; // meta используется для передачи данных в effect

  isKeyboardEvent?: boolean; // событие вызвано через горячую клавишу
  isPostMessageEvent?: boolean; // событие вызвано через postmessage
  isMediaEvent?: boolean; // событие вызвано через мультимедийные клавиши
};
