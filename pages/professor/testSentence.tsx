import { useState } from "react";
import { sendSentence } from "../../controller/testing";
export default function TestSentence() {
  const [courseId, setCourseId] = useState("");
  const [sentence, setSentence] = useState("");
  const handlerTestSentence = async () => {
    await sendSentence(courseId, sentence)
  };
  return (
    <>
      <input type="text" placeholder={"courseId"} value={courseId} onChange={(e) => setCourseId(e.target.value)} />
      <input type="text" placeholder={"sentence"} value={sentence} onChange={(e) => setSentence(e.target.value)} />
      <button onClick={handlerTestSentence}>send test sentence</button>
    </>
  );
}
