import Janus from "../../../public/janus/janus";

function alert_and_log(error,text){
  Janus.error(` -- ${text}  ${error}`);
  alert(`${text}  ${error}`);
}

export function alert_pluginError(error) {
  alert_and_log(error,"Error attaching plugin...")
}

export function alert_webrtcError(error) {
  alert_and_log(error,"WebRTC error:")
}

export function alert_roomDestroy(){
  alert_and_log("","The room has been destroyed!")
}



export function alert_msgError(msg){
  if (msg["error_code"] === 485) {
    // This is a "no such room" error: give a more meaningful description
    Janus.error("audiobridge plug in is not working");
  }
  else if (msg["error_code"] ===426){
    Janus.error("room does not exist");
  }
  else {
    alert(msg["error"]);
  }
}

export function log_consentDialog(on) {
  Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
}

export function log_iceState(state) {
  Janus.log("ICE state changed to " + state);
}

export function log_mediaState(medium, on) {
  Janus.log(
    "Janus " + (on ? "started" : "stopped") + " receiving our " + medium
  );
}

export function log_webrtcState(on) {
  Janus.log(
    "Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now"
  );
}

export function log_plugAttach(plugin) {
  Janus.log(
    "Plugin attached! (" + plugin.getPlugin() + ", id=" + plugin.getId() + ")"
  );
}

export function debug_msg(msg,event) {
  Janus.debug(" ::: Got a message :::", msg);
  Janus.debug("Event: ", event);
}

export function debug_data(data) {
  Janus.debug(" ::: Got a data :::", data);
}

export function log_joining(msg) {
  Janus.log(
    "Successfully joined room " + msg["room"] + " with ID " + msg["id"]
  );
}

export function log_roomChange(msg){
  Janus.log(
    "Moved to room " + msg["room"] + ", new ID: " + msg["id"]
  );
}