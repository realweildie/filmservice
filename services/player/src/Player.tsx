import { FC, ReactNode, useEffect } from "react";
import playerService from "./services/PlayerService";

export interface PlayerProps {
  children?: ReactNode;
}

const DEFAULT_PLAYER_ID = "baseID";

export const Player: FC<PlayerProps> = ({ children }) => {
  useEffect(() => {
    (async () => {
      try {
        await playerService.init(DEFAULT_PLAYER_ID, {});
        await playerService.setSource({
          src: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
          type: "application/x-mpegURL",
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const play = async () => await playerService.play();

  return (
    <div className="player" data-vjs-player>
      <video id={DEFAULT_PLAYER_ID} preload="metadata" muted playsInline />

      {/* button should be in manager, effect should be in effect */}
      <button className="playButton" onClick={play}>
        play
      </button>

      {children}
    </div>
  );
};
