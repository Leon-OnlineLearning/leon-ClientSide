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
    sessionId,
    false
  );
};

export const trainingRelatedFileUploader = async (
  courseId: string,
  files: any[],
  professorId,
  className: string,
  sessionId?: string
) => {
  return await trainingFileUploader(
    courseId,
    files,
    professorId,
    className,
    sessionId,
    true
  );
};

const trainingFileUploader = async (
  courseId: string,
  files: any[],
  professorId: string,
  className: string,
  sessionId?: string,
  related: boolean = false
) => {
  const formData = new FormData();
  if (className) formData.append("className", className);
  formData.append("professorId", professorId);
  formData.append("courseId", courseId);
  files.forEach((file) => {
    formData.append(`files`, file);
  });

  if (sessionId) formData.append("sessionId", sessionId);

  return await apiInstance
    .post(`/training/${related ? "related" : "nonrelated" }/upload`, formData)
    .then((resp) => resp.data)
    .catch((err) => console.error(err));
};
