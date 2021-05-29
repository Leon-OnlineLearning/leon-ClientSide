import apiInstance from "../utils/api";

export const searchForNonRelatedTrainingFilesSubmit = async (
  courseId: string,
  className: string,
  professorId: string,
  files: any[],
  sessionStorage: any
) => {
  return searchForTrainingFilesSubmit(
    false,
    courseId,
    className,
    professorId,
    files,
    sessionStorage
  );
};

export const searchForRelatedTrainingFilesSubmit = async (
  courseId: string,
  className: string,
  professorId: string,
  files: any[],
  sessionStorage: any
) => {
  return searchForTrainingFilesSubmit(
    true,
    courseId,
    className,
    professorId,
    files,
    sessionStorage
  );
};

const searchForTrainingFilesSubmit = async (
  related: boolean,
  courseId: string,
  className: string,
  professorId: string,
  files: any[],
  sessionStorage: any
) => {
  try {
    const resp = await apiInstance
      .post(`/training/{ related ? "related" : "nonRelated" }/existing`, {
        className,
        courseId,
        files,
        professorId,
        sessionId: sessionStorage.getItem("sessionId")
      })
      .then((resp) => resp.data);

    if (resp.sessionId) sessionStorage.setItem("sessionId", resp.sessionId);

    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const searchFiles = async (courseName: string, fileName: string) => {
  try {
    return await apiInstance
      .get(`/searchFile?courseName=${courseName}&topic=${fileName}`)
      .then((resp) => resp.data);
  } catch (e) {
    console.error(e);
  }
};
