import apiInstance from "../utils/api";
export async function raiseModel(modelId: string) {
  try {
    const data = await apiInstance
      .post("/text-classification-models/raise")
      .then((res) => res.data);
    if (!data.success) {
      console.debug("resulted data", data);
      throw new Error("Request failed");
    }
  } catch (e) {
    throw e;
  }
}

export async function getModelsByCourseId(courseId: string) {
  try {
    return await apiInstance
      .get(`/courses/${courseId}/models`)
      .then((res) => res.data);
  } catch (e) {
    throw e;
  }
}