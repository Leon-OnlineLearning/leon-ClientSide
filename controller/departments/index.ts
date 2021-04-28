import axios from "axios";
import config from "../../utils/config";

export async function getDepartments(): Promise<any[]> {
  return await axios
    .get(`${config.serverBaseUrl}/departments`, { withCredentials: true })
    .then((response) => response.data);
}

export async function deleteDepartment(department: any): Promise<void> {
  await axios
    .delete(`${config.serverBaseUrl}/departments/${department.id}`, {
      withCredentials: true,
    })
    .catch((err) => console.error(err));
}

export async function editDepartment(
  oldDepartment: any,
  newDepartment: any
): Promise<any> {
  return await axios
    .put(
      `${config.serverBaseUrl}/departments/${oldDepartment.id}`,
      newDepartment,
      {
        withCredentials: true,
      }
    )
    .then((response) => response.data);
}

export async function addNewDepartment(departmentTitle: string): Promise<any> {
  return await axios
    .post(
      `${config.serverBaseUrl}/departments`,
      { name: departmentTitle },
      { withCredentials: true }
    )
    .then((response) => response.data);
}

export async function assignProfessorToDepartment(
  departmentId: string,
  professorId: string
) {
  return await axios.post(
    `${config.serverBaseUrl}/departments/${departmentId}/professors`,
    {
      professorId,
    },
    { withCredentials: true }
  );
}

export async function assignCourseToDepartment(
  departmentId: string,
  courseId: string
) {
  return await axios.post(
    `${config.serverBaseUrl}/departments/${departmentId}/courses`,
    {
      courseId,
    },
    {
      withCredentials: true,
    }
  );
}

export async function getCoursesForDepartment(departmentId: string) {
  return await axios
    .get(`${config.serverBaseUrl}/departments/${departmentId}/courses`, {
      withCredentials: true,
    })
    .then((resp) => resp.data);
}
