import { useEffect, useState, useRef } from 'react';
import ParticipantsTable from "../../components/stream/lecture_view/paticipants/participants";

import dynamic from "next/dynamic";

const Stream = dynamic(() => import("../../components/stream/stream/stream"), {
  ssr: false,
});


export default function Room() {
  const [participants, setParticipants] = useState([]);
  const [myData, setMyData] = useState({ name: "" });

  let addParticipants = (new_participants) => {
    setParticipants((p) => p.concat(new_participants));
  };
  let removeParticipants = (leaving_participants_id) => {
    setParticipants((participants) =>
      participants.filter((p) => leaving_participants_id !== p.id)
    );
  };

  useEffect(() => {
    let name = prompt("name");
    setMyData({ name: name });
  }, []);


  const janusRef = useRef(null)

  return (
    <>
      <Stream
        ref={janusRef}
        addParticipants={addParticipants}
        removeParticipants={removeParticipants}
        setParticipants={setParticipants}
        setMyData={setMyData}
        myData={myData}
        room={1234}
      />
      {myData.name && <h1>{myData.name}</h1>}
      <ParticipantsTable participants={participants} />

    </>
  );
}