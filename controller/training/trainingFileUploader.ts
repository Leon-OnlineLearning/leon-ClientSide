import apiInstance from "../utils/api";

export const trainingNonRelatedFileUploader = async (
  courseId: string,
  files: any[],
  professorId: string,
  className: string,
  sessionId?: string
) => {
  return await trainingFileUploader(
    courseId,
    files,
    professorId,
    className,
    "training/nonrelated",
    sessionId
  );
};

export const trainingRelatedFileUploader = async (
  courseId: string,
  files: any[],
  professorId: string,
  className: string,
  sessionId?: string
) => {
  return await trainingFileUploader(
    courseId,
    files,
    professorId,
    className,
    "training/related",
    sessionId
  );
};

export const testingFileUploader = async (
  courseId: string,
  files: any[],
  professorId: string,
  className: string,
  sessionId?: string
) => {
  return await trainingFileUploader(
    courseId,
    files,
    professorId,
    className,
    "training/testing",
    sessionId
  );
};

const trainingFileUploader = async (
  courseId: string,
  files: any,
  professorId: string,
  className: string,
  relation: string,
  sessionId?: string
) => {
  const formData = new FormData();
  if (className) formData.append("className", className);
  formData.append("professorId", professorId);
  formData.append("courseId", courseId);

  files.forEach((file: any) => {
    formData.append(`files`, file);
  });

  if (sessionId) formData.append("sessionId", sessionId);

  return await apiInstance
    .post(`/${relation}/upload`, formData)
    .then((resp) => resp.data)
    .catch((err) => console.error(err));
};
