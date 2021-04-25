import axios from "axios";
import config from "../../utils/config";

export async function getExamReport(userId, examId){
    const res = await axios.get(`${config.serverBaseUrl}/exams/report`,
                {
                    params : {
                        userId: userId,
                        examId: examId
                    }
                })
    
    return res.data
}