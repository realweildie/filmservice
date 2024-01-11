export enum VIDEO_TYPE {
  PLAIN = "PLAIN",
  AD = "AD",
  FAKE_VIDEO = "FAKE_VIDEO",
}

export type Events = {
  play: () => void;
  pause: () => void;
};

export type SetSourceOpts = { type?: VIDEO_TYPE; timeout?: number };

export type Hooks = {
  beforeSetSource: (type: VIDEO_TYPE) => Promise<void> | void;
  beforeLaunch: () => Promise<void> | void;
};

export type HookType = keyof Hooks;

export type PlayerHooks = {
  [key in HookType]: Hooks[key][];
};
