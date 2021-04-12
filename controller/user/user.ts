import axios from "axios";
import config from "../../utils/config";
import resourcesPoster from "../utils/resourcesPoster";
import Cookies from "js-cookie";

export async function createNewStudent(data: any) {
	console.log(data);
	
	return await resourcesPoster("students", data)
}

export async function createNewProfessor(data: any) {
	return await resourcesPoster("professors", data)
}

export async function createNewAdmin(data: any) {
	return await resourcesPoster("admins", data)
}

export async function logout() {
  await axios.post(`${config.serverBaseUrl}/auth/logout`, {token: Cookies.get('token')}, {
    withCredentials: true
  })
  .catch(err => console.log(err));
}
