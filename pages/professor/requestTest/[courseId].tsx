import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getFileTestResult, sendSentence } from "../../../controller/testing";

export default function TestSentence() {
  const [sentence, setSentence] = useState("");
  const router = useRouter();
  const handleSending = async () => {
    await sendSentence(router.query["courseId"] as string, sentence);
  };
  return (
    <>
      Send Sentence
      <input
        value={sentence}
        onChange={(e) => {
          setSentence(e.target.value);
        }}
      />
      <Button onClick={handleSending}>Test</Button> <br />
      Note: test takes sometime please check the result page after few minutes
    </>
  );
}
