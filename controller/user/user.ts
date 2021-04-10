import resourcesPoster from "../utils/resourcesPoster";

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