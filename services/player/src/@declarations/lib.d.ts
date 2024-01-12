interface Window {
  appVersion: string;

  avifSupport?: boolean;

  _player: import("video.js").VideoJsPlayer;

  debug?: {
    play?: () => void;
    pause?: () => void;
  };
}
