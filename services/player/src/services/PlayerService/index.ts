/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import { Events, PlayerHooks, SetSourceOpts, VIDEO_TYPE } from "./types";

import { isAndroid } from "react-device-detect";
import { MediatorService } from "../MediatorService";
import { PlayerError } from "../../utils/errors";
import { ERROR_CODES } from "../../../types/errors";

const PlayerService = () => {
  let player: VideoJsPlayer;
  let videoNode: HTMLVideoElement;
  let videoType = VIDEO_TYPE.PLAIN;
  let isSetupSource = false;

  let hooks: PlayerHooks = {
    beforeSetSource: [],
    beforeLaunch: [],
  };

  const mediator = MediatorService<Events>();

  const _initializePlayer = (
    playerId: string,
    options: VideoJsPlayerOptions
  ) => {
    videoNode = document.getElementById(playerId) as HTMLVideoElement;

    return videojs(playerId, {
      preload: "metadata",
      controls: false,
      children: ["mediaLoader"],
      html5: {
        vhs: {
          overrideNative: isAndroid,
        },
        nativeAudioTracks: false,
        nativeVideoTracks: false,
        enableLowInitialPlaylist: true,
      },
      ...options,
    });
  };

  const init = (playerId: string, options: VideoJsPlayerOptions = {}) => {
    new Promise<void>((resolve) => {
      if (player) return resolve();

      player = _initializePlayer(playerId, options);

      window._player = player;

      const events: { [key in keyof Events]?: () => void } = {
        play: () => mediator.emit("play"),
        pause: () => mediator.emit("pause"),
      };

      Object.keys(events).forEach((event) => {
        player.on(event, () => {
          if (!isDispatch()) {
            events[event as keyof Events]?.();
          }
        });
      });
    });
  };

  const isDispatch = () => player.duration() > 0.1;

  const parseNativeError = () => {
    const nativeError = player.error();
    const err = new PlayerError(
      nativeError?.code ?? ERROR_CODES.UNKNOWN,
      nativeError?.message
    );
    return err;
  };

  const setSource = (
    source: videojs.Tech.SourceObject,
    { type = VIDEO_TYPE.PLAIN, timeout }: SetSourceOpts = {}
  ) =>
    new Promise<void>(async (resolve, reject) => {
      if (type === VIDEO_TYPE.FAKE_VIDEO && videoType === VIDEO_TYPE.FAKE_VIDEO)
        return resolve();

      isSetupSource = true;

      // wierd
      //   for (const hook of hooks) {
      //     await hook(type);
      //   }

      let timer = timeout
        ? setTimeout(() => {
            const error = new PlayerError(
              ERROR_CODES.ERROR_DATA_LOADING,
              `source set timeout ${timeout / 1000}s expired`
            );

            reject(error);
          }, timeout)
        : null;

      const onError = () => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }

        const err = parseNativeError();
        reject(err);
      };

      player.one("error", onError);
      player.src(source);
      player.loop(false);
      player.ready(() => {
        videoType = type;
        player.one("loadedmetadata", () => {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }

          player.off("error", onError);
          resolve();
        });
      });
    }).finally(() => {
      isSetupSource = false;
    });

  const playVideo = async () => {
    const promise = player.play();

    if (promise !== undefined) {
      try {
        await promise;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  };

  const play = async () => {
    try {
      await playVideo();
    } catch (e) {}
  };

  const pause = () => {
    if (player && !player.paused()) player.pause();
  };

  return {
    init,
    setSource,
    play,
    pause,
  };
};

const instance = PlayerService();
export default instance;
