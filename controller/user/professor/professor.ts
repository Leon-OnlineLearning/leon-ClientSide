import axios from "axios";
import config from "../../../utils/config";

export async function assigningCourseToProfessor(
  professorId: string,
  courseId: string
) {
  return await axios
    .post(
      `${config.serverBaseUrl}/professors/${professorId}/courses`,
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
  return await axios
    .post(
      `${config.serverBaseUrl}/professors/${professorId}/lectures`,
      {
        lectureId,
      },
      { withCredentials: true }
    )
    .then((resp) => resp.data);
}

export async function getAllCoursesByProfessor(professorId: string) {
  return await axios
    .get(`${config.serverBaseUrl}/professors/${professorId}/lectures`, {
      withCredentials: true,
    })
    .then((resp) => resp.data);
}
