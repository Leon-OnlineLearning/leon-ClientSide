import { useEffect, useRef, useState } from "react";
import ParticipantsTable from "../../components/stream/lecture_view/paticipants/participants";

import dynamic from "next/dynamic";

const Stream = dynamic(() => import("../../components/stream/stream/stream"), {
  ssr: false,
});

const StudentViewer = dynamic(
  () => import('../../components/stream/viewer/studentViewer'),
  { ssr: false }
)
/**
 * @deprecated
 */
export default function Room() {
  const [participants, setParticipants] = useState([]);
  const [myData, setMyData] = useState({ name: "" });

  const [pointerPositionX, setPointerPositionX] = useState(100);
  const [pointerPositionY, setPointerPositionY] = useState(100);
  const [pageNumber, setPageNumber] = useState(1);

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
        enableDataRecv={true}
        setPointerPositionX={setPointerPositionX}
        setPointerPositionY={setPointerPositionY}
        setPageNumber={setPageNumber}
      />
      {myData.name && <h1>{myData.name}</h1>}
      <ParticipantsTable participants={participants} />
      <StudentViewer pointerPositionX={pointerPositionX} pointerPositionY={pointerPositionY}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      />
    </>
  );
}
