import axios from "axios";
import {
  ExamRecordingInterface,
  RefranceRecordingInterface,
} from "../../model/examination/Recordings";
import data from "../../db.json";
import config from "../../utils/config";
import apiInstance from "../utils/api";
import { Event } from "../../model/event";

export async function assignExamToCourse(examId: string, courseId: string) {
  return await apiInstance.post(
    `/courses/${courseId}/exams`,
    { examId },
    {
      withCredentials: true,
    }
  );
}

export async function createExam(examData: any) {
  return await axios.post(`${config.serverBaseUrl}/exams`, examData, {
    withCredentials: true,
  });
}

/**
 * send a chunk of data for now it is simple fetch call with post method
 * NOTE not all chuncks are playable
 * acording to https://www.w3.org/TR/mediastream-recording/#dom-mediarecorder-start
 * ```
 * The UA MUST record stream in such a way that the original Tracks can be
 * retrieved at playback time. When multiple Blobs are returned
 * (because of timeslice or requestData()), the individual Blobs
 *  need not be playable, but the combination of all the Blobs
 * from a completed recording MUST be playable.
 * ```
 * which turns out to mean that we need the first chnunk to
 * reconstranct file __we may need the last chunk but as i tested
 * we don't need it
 *
 * TODO handle failed requests
 * TODO handle lost connection
 * TODO handle closing browser
 */
export async function sendExamRecording(examRecording: ExamRecordingInterface) {
  var blob = new Blob(examRecording.recordedChunks, {
    type: "video/webm",
  });

  var fd = new FormData();
  fd.append("chuck", blob, `upl.webm`);
  fd.append("chunckIndex", String(examRecording.chunckIndex));
  fd.append("userId", examRecording.userId);
  fd.append("examId", examRecording.examId);
  // TODO add last chunk
  fd.append("lastChunk", String(false));
  // TODO calculate this with dynamic resloation
  fd.append("chunkStartTime", String(examRecording.chunckIndex * 10));
  fd.append("chunkEndTime", String((examRecording.chunckIndex + 1) * 10));

  const url = `${config.serverBaseUrl}/exams/record`;
  fetch(url, {
    method: "put",
    body: fd,
  })
    .then((res) => {
      console.log("Promise resolved", res);
    })
    .catch(console.log);
}

export async function sendRefranceVideo(
  refranceRecording: RefranceRecordingInterface
) {
  var blob = new Blob(refranceRecording.recordedChunks, {
    type: "video/webm",
  });

  var fd = new FormData();
  fd.append("chuck", blob, `upl.webm`);
  fd.append("userId", refranceRecording.userId);

  console.log("sent");
  const url = `${config.serverBaseUrl}/students/refrance`;
  fetch(url, {
    method: "put",
    body: fd,
  })
    .then((res) => {
      console.log("Promise resolved", res);
    })
    .catch(console.log);
}

export async function getAllExams(studentId): Promise<Array<Event>> {
  
  // TODO throw  error that effect ui
  const res = await apiInstance.get(
    `/exams/student/${studentId}`,  
  )

  res.data.map(exam => {
    exam.startDate = exam.startTime;
    exam.endDate = exam.endTime} )
  return res.data as Event[]
}
