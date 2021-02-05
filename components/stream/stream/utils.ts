import Janus from "../../../public/janus/janus";
import { alert_webrtcError } from "./callback_logger";

export function publishMyAudioStream(plugin) {
  plugin.createOffer({
    media: { video: false }, // This is an audio only room
    success: function (jsep) {
      Janus.debug("Got SDP!", jsep);
      var publish = { request: "configure", muted: false };
      plugin.send({ message: publish, jsep: jsep });
    },
    error: alert_webrtcError,
  });
}

export function HasParticipants(msg) {
  return (msg["participants"] && msg["participants"].length) > 0;
}

/**
 *
 * @param msg recived msg from janus
 * @param actionOnParticipants callable funcition to update participants state
 */
export function handleParticipants(msg, actionOnParticipants) {
  if (HasParticipants(msg)) {
    var list = msg["participants"];
    Janus.debug("Got a list of participants:", list);
    actionOnParticipants(list);
  }
}