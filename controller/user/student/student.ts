import axios from "axios";
import config from "../../../utils/config";

export async function attendLecture(studentId: string, lectureId: string) {
  return await axios
    .post(
      `${config.serverBaseUrl}/students/${studentId}/lectures`,
      {
        lectureId,
      },
      {
        withCredentials: true,
      }
    )
    .then((resp) => resp.data);
}

export async function getLecturesAttended(studentId: string) {
  return await axios
    .get(`${config.serverBaseUrl}/student/${studentId}/lectures`, {
      withCredentials: true,
    })
    .then((resp) => resp.data);
}

/**
 * Note: use the following date format (year-month-day) for example (2021-04-10)
 * @param studentId
 * @param startingFrom
 * @param endingAt
 * @returns
 */
export async function getAllEvents(
  studentId: string,
  startingFrom: string,
  endingAt: string
) {
  return await axios
    .get(
      `${config.serverBaseUrl}/students/${studentId}/events?startingFrom=${startingFrom}&endingAt=${endingAt}`,
      { withCredentials: true }
    )
    .then((resp) => resp.data);
}

export async function getStudentAttendance(studentId: string) {
  return axios
    .get(`${config.serverBaseUrl}/students/${studentId}/attendance`, {
      withCredentials: true,
    })
    .then((resp) => resp.data);
}
