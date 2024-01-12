import { EffectOpts } from "../../../../interfaces";
import { sendEvent } from "../../../action";

export const setPLayerSource = async (opts: EffectOpts) => {
  const {
    dispatch,
    services: { playerService },
  } = opts;

  try {
    await playerService.setSource({
      src: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      type: "application/x-mpegURL",
    });

    dispatch(
      sendEvent({
        type: "SET_SOURCE_SUCCESS",
      })
    );
  } catch (err) {
    console.log(err);
  }
};
