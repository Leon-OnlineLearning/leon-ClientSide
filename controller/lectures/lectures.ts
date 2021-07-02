import axios from "axios";
import { LiveRoom } from "../../model/LiveRoom";
import config from "../../utils/config";
import apiInstance from "../utils/api";

export async function createNewLectures(lecture) {
  await apiInstance.post(`/lectures`, lecture, {
    withCredentials: true,
  });
}

export async function getStudentsAttendedLecture(lectureId: string) {
  await apiInstance
    .get(`/lectures/${lectureId}/students`, {
      withCredentials: true,
    })
    .then((resp) => resp.data);
}

export async function deleteLecture(lectureId: string) {
  await apiInstance.delete(`/lectures/${lectureId}`, {
    withCredentials: true,
  });
}

export async function getRoomByLectureId(lectureId: string) : Promise<LiveRoom>{
  return await apiInstance.get(`/lectures/enter/${lectureId}`)
  .then(res => res.data as LiveRoom)
}