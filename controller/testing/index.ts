import axios from "axios";
import apiInstance from "../utils/api";

export const sendSentence = async (courseId: string, sentence: string) => {
  return await apiInstance.post("/text-classification-models/test-sentence", {
    courseId,
    sentence,
  });
};

export const sendTestFile = async (courseId: string) => {
  return await apiInstance.post("/text-classification-models/test-files", {
    courseId,
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

interface TestResultContent {
	success: boolean, 
	content: any
}

export const getSentenceTestResult = async (courseId: string) => {
  return await apiInstance
    .get<TestResultContent>(`/courses/${courseId}/result/sentence`)
    .then((res) => res.data);
};

export const getFileTestResult = async (courseId: string) => {
  return await apiInstance
    .get<TestResultContent>(`/courses/${courseId}/result/sentence`)
    .then((res) => res.data);
};
