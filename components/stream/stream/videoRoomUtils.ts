

export function subscribeToFeed(plugin, my_private_id, feed_id, room_id ) {
    let subscribe = {
        request: "join",
        room: room_id,
        ptype: "subscriber",
        feed: feed_id,
        private_id: my_private_id
    }

    plugin.send({
      message: subscribe
    });
  }

export function sendOwnfeed(plugin,jsep){
  // TODO publish vedio feed from screenshare here
  let publish = { request: "configure", audio: false, video: false ,date: true};
  plugin.send({message: publish, jsep:jsep});
}