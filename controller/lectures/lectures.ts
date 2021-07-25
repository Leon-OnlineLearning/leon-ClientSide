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

export async function getRoomByLectureId(lectureId: string): Promise<LiveRoom> {
  const res = await apiInstance.get(`/lectures/enter/${lectureId}`);
  return res.data;
}

export async function endRoomByLectureId(lectureId: string): Promise<void> {
  await apiInstance.get(`/lectures/end/${lectureId}`);
}

export interface LectureStatsData {
  maxNumberOfStudents: number;
  minNumberOfStudents: number;
  mean: number;
  lectureWithMaxStudents: string;
  lectureWithMinStudents: string;
}

export function getLecturesStatsData(stats: any): LectureStatsData {
  let max = -Infinity,
    maxLecture: string,
    mean: number,
    min = Infinity,
    minLecture: string,
    sum = 0;
  Object.keys(stats).forEach((lectureName) => {
    const nStudents = stats[lectureName];
    if (nStudents > max) {
      max = nStudents;
      maxLecture = lectureName;
    }
    if (nStudents < min) {
      min = nStudents;
      minLecture = lectureName;
    }
    sum += nStudents;
  });
  mean = sum / Object.keys(stats).length;
  return {
    maxNumberOfStudents: max,
    minNumberOfStudents: min,
    mean,
    lectureWithMaxStudents: maxLecture,
    lectureWithMinStudents: minLecture,
  };
}
