import axios from "axios";
import config from "../../utils/config";

export async function assignExamToCourse(examId: string, courseId: string) {
  return await axios.post(
    `${config.serverBaseUrl}/courses/${courseId}/exams`,
    { examId },
    {
      withCredentials: true,
    }
  );
}

export async function createExam(examData: any) {
    return await axios.post(`${config.serverBaseUrl}/exams`,examData, {
        withCredentials: true
    })    
}