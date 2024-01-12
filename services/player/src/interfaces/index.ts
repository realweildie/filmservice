import { SetSourceOpts } from "../services/PlayerService/types";

import videojs, { VideoJsPlayerOptions } from "video.js";
import { SessionDispatch } from "../store/dispatch";
import { AppState } from "../store";

export interface IPlayerService {
  init: (playerId: string, options: VideoJsPlayerOptions) => Promise<void>;
  play: () => Promise<void>;
  pause: () => void;
  setSource: (source: videojs.Tech.SourceObject, opts?: SetSourceOpts) => void;
}

export interface IServices {
  playerService: IPlayerService;
}

export type EffectOpts = {
  dispatch: SessionDispatch;
  getState: () => AppState;
  services: IServices;
};
