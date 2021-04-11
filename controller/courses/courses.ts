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

