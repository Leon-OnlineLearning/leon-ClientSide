import { Lecture } from "../../../model/lecture";
import apiInstance from "../../utils/api";

export async function assigningCourseToProfessor(
  professorId: string,
  courseId: string
) {
  return await apiInstance
    .post(
      `/professors/${professorId}/courses`,
      {
        courseId,
      },
      { withCredentials: true }
    )
    .then((resp) => resp.data);
}

export async function assignLectureToProfessor(
  professorId: string,
  lectureId: string
) {
  return await apiInstance
    .post(
      `/professors/${professorId}/lectures`,
      {
        lectureId,
      },
      { withCredentials: true }
    )
    .then((resp) => resp.data);
}

export async function getAllCoursesByProfessor(professorId: string) {
  return await apiInstance
    .get(`/professors/${professorId}/courses`, {
      withCredentials: true,
    })
    .then((resp) => resp.data);
}

export async function getAllLectureByProfessor(professorId: string) :Promise<Lecture[]>{
  return await apiInstance
    .get(`/professors/${professorId}/lectures`)
    .then(res => res.data as Lecture[])
    .then(data=> {
      return data.map(lec => {
        lec.startTime = new Date(lec.startTime)
        return lec
      })
    })
}
