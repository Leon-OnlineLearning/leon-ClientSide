import axios from "axios";
import apiInstance from "../utils/api";

export const sendSentence = async (courseId: string, sentence: string) => {
  return await apiInstance.post("/text-classification-models/test-sentence", {
    courseId,
    sentence,
  });
};
