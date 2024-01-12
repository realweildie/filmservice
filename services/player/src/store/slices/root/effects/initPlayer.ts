import { EffectOpts } from "../../../../interfaces";
import { DEFAULT_PLAYER_ID } from "../../../../services/PlayerService/types";
import { sendEvent } from "../../../action";

export const initPlayer = async (opts: EffectOpts) => {
  const {
    dispatch,
    services: { playerService },
  } = opts;

  try {
    await playerService.init(DEFAULT_PLAYER_ID, {});

    dispatch(
      sendEvent({
        type: "PLAYER_INIT_RESOLVE",
      })
    );
  } catch (err) {
    console.log("error here");

    // we actualy need to add action with player rejection
    // but now we can't get error
  }
};
