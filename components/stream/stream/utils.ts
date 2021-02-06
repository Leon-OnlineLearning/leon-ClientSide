import Janus from "../../../public/janus/janus";
import { alert_webrtcError } from './callback_logger';
import { newRemoteFeed } from "./pluginUtils";
import { sendOwnfeed } from './videoRoomUtils';

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

export function hasPublisher(msg) {
  return (msg["publishers"] && msg["publishers"].length) > 0;
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

export function publishOwnFeed(plugin) {
  // for now will only create a data offer
  plugin.createOffer(
    {
      media: {audioRecv: false, videoRecv: false, audioSend: false, videoSend: false, data:true},
      success: (jsep)=>{
				Janus.debug("Got publisher SDP!", jsep);
        sendOwnfeed(plugin,jsep)
      },
      error: alert_webrtcError
    }
  )
}

export function handleRemoteFeed(janus, msg, private_id, room_id) {
  if (hasPublisher(msg)) {
    var list = msg["publishers"];
    Janus.debug("Got a list of participants:", list);
    for (const pulisher of list) {
      newRemoteFeed(
        janus,
        pulisher.id,
        pulisher.display,
        pulisher.audio_codec,
        pulisher.video_codec,
        private_id,
        room_id
      );
    }
  }
}
