import apiInstance from "../utils/api";
export default async function finishSendingTC(professorId: string) {
  try {
    return await apiInstance
      .post("/training/finish", { professorId })
      .then((res) => res.data);
  } catch (e) {
    throw e;
  }
}
