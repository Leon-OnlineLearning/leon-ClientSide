import axios from "axios";
import config from "../../utils/config";
import apiInstance from "../utils/api";

export async function getDepartments(): Promise<any[]> {
  return await apiInstance
    .get(`/departments`, { withCredentials: true })
    .then((response) => response.data);
}

export async function deleteDepartment(department: any): Promise<void> {
  await apiInstance
    .delete(`/departments/${department.id}`, {
      withCredentials: true,
    })
    .catch((err) => console.error(err));
}

export async function editDepartment(
  oldDepartment: any,
  newDepartment: any
): Promise<any> {
  return await apiInstance
    .put(
      `/departments/${oldDepartment.id}`,
      newDepartment,
      {
        withCredentials: true,
      }
    )
    .then((response) => response.data);
}

export async function addNewDepartment(departmentTitle: string): Promise<any> {
  return await apiInstance
    .post(
      `/departments`,
      { name: departmentTitle },
      { withCredentials: true }
    )
    .then((response) => response.data);
}

export async function assignProfessorToDepartment(
  departmentId: string,
  professorId: string
) {
  return await apiInstance.post(
    `/departments/${departmentId}/professors`,
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
  return await apiInstance.post(
    `/departments/${departmentId}/courses`,
    {
      courseId,
    },
    {
      withCredentials: true,
    }
  );
}

export async function getCoursesForDepartment(departmentId: string) {
  return await apiInstance
    .get(`/departments/${departmentId}/courses`, {
      withCredentials: true,
    })
    .then((resp) => resp.data);
}
