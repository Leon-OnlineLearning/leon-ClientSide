import axios from "axios";
import apiInstance from "../utils/api";

export const sendSentence = async (courseId: string, sentence: string) => {
  return await apiInstance.post("/text-classification-models/test-sentence", {
    courseId,
    sentence,
  });
};

/**
 * start testing the exam, i think this should be triggered automatically after the exam ends
 * check the test-exam route at the backend for implementation
 *
 * @param examId
 * @param sentence
 * @returns
 */
export const testExam = async (examId: string, studentId: string) => {
  return await apiInstance.post("/text-classification-models/test-exam", {
    examId,
    studentId,
  });
};
