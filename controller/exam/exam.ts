import axios from "axios";
import {
  ExamRecordingInterface,
  RefranceRecordingInterface,
} from "../../model/examination/Recordings";
import config from "../../utils/config";
import apiInstance from "../utils/api";
import { Event } from "../../model/event";
import { Exam } from "../../model/Exam";
import { QuestionInterface } from "../../model/examination/question";
import { TextAnswer } from "../../model/examination/answer";

export async function assignExamToCourse(examId: string, courseId: string) {
  return await apiInstance.post(
    `/courses/${courseId}/exams`,
    { examId },
    {
      withCredentials: true,
    }
  );
}

export async function createExam(examData: Exam) {
  return await apiInstance.post(`/exams`, examData, {
    withCredentials: true,
  });
}

/**
 * send a chunk of data for now it is simple fetch call with post method
 * NOTE not all chunks are playable
 * according to https://www.w3.org/TR/mediastream-recording/#dom-mediarecorder-start
 * ```
 * The UA MUST record stream in such a way that the original Tracks can be
 * retrieved at playback time. When multiple Blobs are returned
 * (because of time-slice or requestData()), the individual Blobs
 *  need not be playable, but the combination of all the Blobs
 * from a completed recording MUST be playable.
 * ```
 * which turns out to mean that we need the first chunk to
 * reconstruct file __we may need the last chunk but as i tested
 * we don't need it
 *
 * TODO handle failed requests
 * TODO handle lost connection
 * TODO handle closing browser
 */
export async function sendExamRecording(examRecording: ExamRecordingInterface): Promise<boolean> {
  var blob = new Blob(examRecording.recordedChunks, {
    type: "video/webm",
  });

  var fd = new FormData();
  fd.append("chuck", blob, `upl.webm`);
  fd.append("chunckIndex", String(examRecording.chunckIndex));
  fd.append("userId", examRecording.userId);
  fd.append("examId", examRecording.examId);
  // TODO add last chunk
  fd.append("lastChunk", String(examRecording.isLastChunk));
  // TODO calculate this with dynamic resolution
  fd.append("chunkStartTime", String(examRecording.startingFrom));
  fd.append("chunkEndTime", String((examRecording.endingAt)));

  const url = `${config.serverBaseUrl}/exams/record`;
  try {
    const res = await fetch(url, {
      method: "put",
      body: fd,
    })
    console.debug("video sent successfully");
    return true
  }
  catch (err) {
    console.log(err)
    return false
  }

}

export async function sendReferenceVideo(
  refranceRecording: RefranceRecordingInterface
) {
  var blob = new Blob(refranceRecording.recordedChunks, {
    type: "video/webm",
  });

  var fd = new FormData();
  fd.append("chuck", blob, `upl.webm`);
  fd.append("userId", refranceRecording.userId);

  console.debug("sent");
  const url = `${config.serverBaseUrl}/students/refrance`;
  fetch(url, {
    method: "put",
    body: fd,
  })
    .then((res) => {
      console.debug("Promise resolved", res);
    })
    .catch(console.error);
}

export async function sendLivenessMark(studentId: string, ExamId: string, startTime: number, endTime: number): Promise<void> {
  const url = `/exams/liveness`;
  const data = {
    "userId": studentId,
    "examId": ExamId,
    "startingTime": `${startTime}`,
    "endingTime": `${endTime}`
  }
  try {
    const res = await apiInstance.put(url, data)

    console.debug("liveness mark sent successfully");
  }
  catch (err) {
    console.log(err)
  }

}

export async function getAllExams(studentId): Promise<Array<Exam>> {

  // TODO throw  error that effect ui
  const res = await apiInstance.get(
    `/exams/student/${studentId}`,
  )

  res.data.map(exam => {
    exam.startDate = new Date(exam.startTime);
    exam.endDate = new Date(exam.endTime)
  })
  return res.data as Exam[]

}

export async function getExamById(examId: string): Promise<Exam> {
  const res = await apiInstance.get(
    `/exams/${examId}`
  )
  return res.data
}

/**
 * Gets next question and submit answer for current one if available.
 * @param examId 
 * @param studentId 
 * @param [current_answer] answer to current viewed question
 * @returns next question 
 */
export async function getNextQuestion(examId: string, studentId: string, current_answer?: TextAnswer): Promise<QuestionInterface | "done"> {
  console.log("getting next question")
  const res = await apiInstance.post<QuestionInterface | undefined>(
    `/exams/questions/next`,
    {
      examId: examId,
      studentId: studentId,
      answer: current_answer?.toJson(),
    },
  )
  console.debug("next Question is")
  console.debug(res.data)
  return res.data
}

export async function getCurrentQuestion(examId: string, studentId: string): Promise<QuestionInterface | "done"> {
  console.log("getting next question")
  const res = await apiInstance.post<QuestionInterface | undefined>(
    `/exams/questions/current`,
    {
      examId: examId,
      studentId: studentId,
    },
  )
  console.debug("current Question is")
  console.debug(res.data)
  return res.data
}