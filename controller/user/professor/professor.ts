import axios from "axios";
import config from "../../../utils/config";
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
