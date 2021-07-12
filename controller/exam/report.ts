import { IncidentInterface } from "../../model/examination/report";
import apiInstance from "../utils/api";

export async function getExamReport(userId, examId){
    const res = await apiInstance.get<IncidentInterface[]>(`/exams/report`,
                {
                    params : {
                        userId: userId,
                        examId: examId
                    }
                })
    
    return res.data
}