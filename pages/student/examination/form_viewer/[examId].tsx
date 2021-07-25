import React, { useContext, useEffect, useState } from 'react';
import { useRouterQuery } from '../../../../hooks/useRouteQuery';
import { getExamById, getSecondarySecret } from '../../../../controller/exam/exam';
import ExamRunner from '../../../../components/examination/exam_container/prepare_exam';
import LocalStorageContext from '../../../../contexts/localStorageContext';



export default function FormViewerSequential() {

  const [exam, setExam] = useState(null)
  const [examId, queryChecked] = useRouterQuery("examId")
  const [secondarySecret, setSecondarySecret] = useState(null)

  const localStorageContext = useContext(LocalStorageContext)

  useEffect(() => {
    if (examId) {
      getExamById(examId).
        then((exam) => {
          getSecondarySecret(examId, localStorageContext.userId).then((secret) => {
            setSecondarySecret(secret)
            setExam(exam)
          })

        })
    }
  }, [examId])

  return <>{exam && secondarySecret && <ExamRunner exam={exam} secondarySecret={secondarySecret} />}</>
}
