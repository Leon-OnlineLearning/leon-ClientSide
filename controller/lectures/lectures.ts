import axios from "axios";
import config from "../../utils/config";

export async function createNewLectures(lecture) {
  await axios.post(`${config.serverBaseUrl}/lectures`, lecture, {
    withCredentials: true,
  });
}

export async function getStudentsAttendedLecture(lectureId: string) {
  await axios
    .get(`${config.serverBaseUrl}/lectures/${lectureId}/students`, {
      withCredentials: true,
    })
    .then((resp) => resp.data);
}

export async function deleteLecture(lectureId: string) {
  await axios.delete(`${config.serverBaseUrl}/lectures/${lectureId}`, {
    withCredentials: true,
  });
}
