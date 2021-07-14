import apiInstance from "../utils/api";
export default async function finishSendingTC(professorId: string, courseId: string) {
  try {
    return await apiInstance
      .post("/training/finish", { professorId, courseId })
      .then((res) => res.data);
  } catch (e) {
    throw e;
  }
}
