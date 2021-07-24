import React, { useEffect, useState } from 'react';
import { useRouterQuery } from '../../../../hooks/useRouteQuery';
import { getExamById } from '../../../../controller/exam/exam';
import ExamForm from '../../../../components/examination/exam_container/exam_form';


export default function FormViewerSequential() {
  
  const [exam, setExam] = useState(null)
  const [examId, queryChecked] = useRouterQuery("examId")
  

  useEffect(() => {
    if (examId) {
      getExamById(examId).
        then((exam) => { setExam(exam) })
    }
  }, [examId])

  return <>{exam && <ExamForm exam={exam} />}</>
}
