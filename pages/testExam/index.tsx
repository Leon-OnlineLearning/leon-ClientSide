import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { testExam } from "../../controller/testing";

/**
 * this function should be removed and replaced with a trigger at the end of each exam
 */
export default function TOBEREMOVED() {
  const [studentId, setStudentId] = useState("");
  const [examId, setExamId] = useState("");
  useEffect(() => {}, []);
  return (
    <>
      <input
        type="text"
        name="studentId"
        id="studentId"
        onChange={(e) => {
          setStudentId(e.target.value);
        }}
        value={studentId}
        placeholder="student id"
      />
      <input
        type="text"
        name="examId"
        id="examId"
        onChange={(e) => {
          setExamId(e.target.value);
        }}
        value={examId}
        placeholder="examId"
      />
      <Button onClick={async () => await testExam(examId, studentId)}>
        send
      </Button>
    </>
  );
}
