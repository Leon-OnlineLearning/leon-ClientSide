import axios from "axios";
import {
  ExamRecordingInterface,
  RefranceRecordingInterface,
} from "../../model/examination/Recordings";
import config from "../../utils/config";
import apiInstance from "../utils/api";
import { Event } from "../../model/event";
import { Exam } from "../../model/Exam";

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
export async function sendExamRecording(examRecording: ExamRecordingInterface):Promise<boolean> {
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
  // TODO calculate this with dynamic resloation
  fd.append("chunkStartTime", String(examRecording.startingFrom));
  fd.append("chunkEndTime", String((examRecording.endingAt)));

  const url = `${config.serverBaseUrl}/exams/record`;
  try{
    const res = await fetch(url, {
      method: "put",
      body: fd,
    })
    console.debug("vedio send succefully");
    return true
  }
  catch(err){
    console.log(err)
    return false
  }

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

export async function getExamById(examId:string) : Promise<Exam>{
  const res = await apiInstance.get(
    `/exams/${examId}`
  )
  return res.data
}