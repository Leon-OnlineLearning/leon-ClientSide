import axios from "axios";
import Item from "../../model/Item";
import config from "../../utils/config";
import { refreshToken } from "../tokens";
import apiInstance from "../utils/api";

export async function getAllCourses() {
  return await apiInstance
    .get(`/courses`, { withCredentials: true })
    .then((response) => response.data);
}

export async function editCourse(oldCourse: Item, newCourse: Item) {
  await apiInstance.put(
    `/courses/${oldCourse.id}`,
    newCourse,
    { withCredentials: true }
  );
}

export async function addNewCourse(course) {
  return await apiInstance
    .post(
      `/courses/`,
      { name: course.name, year: course.year, department: course.department },
      {
        withCredentials: true,
      }
    )
    .then((response) => response.data);
}

export async function deleteCourse(courseId: string) {
  await apiInstance.delete(`/courses/${courseId}`, {
    withCredentials: true,
  });
}

export async function assignLectureToCourse(
  lectureId: string,
  courseId: string
) {
  await apiInstance
    .post(
      `/courses/${courseId}/lectures`,
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
  return await apiInstance
    .post(
      `/students/${studentId}/courses`,
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
  return apiInstance
    .get(`/courses/${courseId}/lectures`, {
      withCredentials: true,
    })
    .then((resp) => resp.data);
}

export async function getLecturesStatsByCourse(courseId: string) {
  return await apiInstance
    .get(`/courses/${courseId}/stats`)
    .then((resp) => resp.data);
}

export async function assignExamToCourse(courseId: string, examId: string) {
  return await apiInstance
    .post(
      `/courses/${courseId}/exams`,
      {
        examId,
      },
      { withCredentials: true }
    )
    .then((resp) => resp.data);
}

export async function getAllExamsByCourse(courseId: string) {
  return await apiInstance
    .get(`/courses/${courseId}/exams`, {
      withCredentials: true,
    })
    .then((resp) => resp.data);
}
