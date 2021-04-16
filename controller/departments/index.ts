import axios from "axios";
import config from "../../utils/config";

export async function getDepartments() : Promise<any[]> {
  return await axios
    .get(`${config.serverBaseUrl}/departments`, { withCredentials: true })
    .then((response) => response.data);
}

export async function deleteDeprtment(department: any): Promise<void> {
  await axios
    .delete(`${config.serverBaseUrl}/departments/${department.id}`, {
      withCredentials: true,
    })
    .catch((err) => console.error(err));
}

export async function editDepartment(oldDepartment:any, newDepartment: any) :Promise<any> {
  return await axios
    .put(`${config.serverBaseUrl}/departments/${oldDepartment.id}`, newDepartment, {
      withCredentials: true,
    })
    .then((response) => response.data);
}

export async function addNewDepartment(departmentTitle: string) : Promise<any> {
  return await axios
    .post(`${config.serverBaseUrl}/departments`, { name: departmentTitle }, {withCredentials: true})
    .then((response) => response.data);
}
