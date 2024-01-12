import { FC, ReactNode, useEffect } from "react";
import { DEFAULT_PLAYER_ID } from "./services/PlayerService/types";
import { useAppDispatch, useAppSelector } from "./store";
import { sendEvent } from "./store/action";

export interface PlayerProps {
  children?: ReactNode;
}

export const Player: FC<PlayerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isShowUI = useAppSelector((state) => state.root.isShowUI);

  useEffect(() => {
    dispatch(sendEvent({ type: "DO_PLAYER_INIT" }));
  }, [dispatch, isShowUI]);

  // const play = async () => await playerService.play();

  return (
    <div className="player" data-vjs-player>
      {isShowUI && (
        <video id={DEFAULT_PLAYER_ID} preload="metadata" muted playsInline />
      )}

      {/* button should be in manager, effect should be in effect */}
      {/* <button className="playButton" onClick={play}>
        play
      </button> */}

      {children}
    </div>
  );
};
