import axios from "axios";
import Item from "../../model/Item";
import config from "../../utils/config";

export async function getAllCourses() {
  return await axios
    .get(`${config.serverBaseUrl}/courses`, { withCredentials: true })
    .then((response) => response.data);
}

export async function editCourse(oldCourse: Item, newCourse: Item) {
  await axios.put(
    `${config.serverBaseUrl}/courses/${oldCourse.id}`,
    newCourse,
    { withCredentials: true }
  );
}

export async function addNewCourse(title: string) {
  return await axios
    .post(
      `${config.serverBaseUrl}/courses/`,
      { name: title },
      {
        withCredentials: true,
      }
    )
    .then((response) => response.data);
}

export async function deleteCourse(course: Item) {
  await axios.delete(`${config.serverBaseUrl}/courses/${course.id}`, {
    withCredentials: true,
  });
}

export async function assignLectureToCourse(
  lectureId: string,
  courseId: string
) {
  await axios
    .post(
      `${config.serverBaseUrl}/courses/${courseId}/lectures`,
      {
        lectureId: lectureId,
      },
      {
        withCredentials: true,
      }
    )
    .then((resp) => resp.data);
}

export async function addStudentToCourse(courseId: string, studentId: string) {
  return await axios
    .post(
      `${config.serverBaseUrl}/students/${studentId}/courses`,
      {
        courseId,
      },
      {
        withCredentials: true,
      }
    )
    .then((resp) => resp.data);
}

export async function getLecturesToCourse(courseId: string) {
  return axios
    .get(`${config.serverBaseUrl}/courses/${courseId}/lectures`, {
      withCredentials: true,
    })
    .then((resp) => resp.data);
}

export async function getLecturesStatsByCourse(courseId: string) {
  return await axios
    .get(`${config.serverBaseUrl}/course/${courseId}/stats`)
    .then((resp) => resp.data);
}

export async function assignExamToCourse(courseId: string, examId: string) {
  return await axios
    .post(
      `${config.serverBaseUrl}/courses/${courseId}/exams`,
      {
        examId,
      },
      { withCredentials: true }
    )
    .then((resp) => resp.data);
}

export async function getAllExamsByCourse(courseId: string) {
  return await axios
    .get(`${config.serverBaseUrl}/courses/${courseId}/exams`, {
      withCredentials: true,
    })
    .then((resp) => resp.data);
}
