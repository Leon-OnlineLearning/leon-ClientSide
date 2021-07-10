import { LiveRoom } from "../../model/LiveRoom";
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
  
    const res =  await apiInstance.get(`/lectures/enter/${lectureId}`)
    return res.data
}

export async function endRoomByLectureId(lectureId: string) : Promise<void>{
    await apiInstance.get(`/lectures/end/${lectureId}`)
}