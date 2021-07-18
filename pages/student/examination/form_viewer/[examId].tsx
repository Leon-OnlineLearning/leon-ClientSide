import router, { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
import ExamContainer from '../../../../components/examination/exam_container/ExamContainer';
import Question_view from '../../../../components/examination/Question_view';
import Recorder from '../../../../components/examination/recording/exam_record';
import Timer from '../../../../components/examination/timer/timer';
import { useRouterQuery } from '../../../../hooks/useRouteQuery';
import { Button, Spinner } from 'react-bootstrap';
import { getCurrentQuestion, getExamById, getNextQuestion } from '../../../../controller/exam/exam';
import { Exam } from '../../../../model/Exam';
import LocalStorageContext from '../../../../contexts/localStorageContext';
import { QuestionInterface } from '../../../../model/examination/question';
import { TextAnswer } from '../../../../model/examination/answer';


export default function FormViewerSequential() {
  const [question, setQuestion] = useState<QuestionInterface>()
  const [answer, setAnswer] = useState<TextAnswer>()


  const localStorageContext = useContext(LocalStorageContext)


  // get exam info
  const [exam, setExam] = useState<Exam>()
  const [examId, queryChecked] = useRouterQuery("examId")
  useEffect(() => {
    if (examId) {
      getExamById(examId).
        then((exam) => { setExam(exam) })
    }
  }, [examId])


  // TODO make this get current question
  useEffect(() => {
    if (exam) {
      getCurrentQuestion(exam.id, localStorageContext.userId).then((data) => {
        if (data == "done") {
          // display already done message
          console.log("exam already done");
        }
        else
        setQuestion(data)
      });
    }
  }, [exam])
  
  // get next question and submit answer
  const handleNext = () => {
    if (exam) {
      if (!answer) {
        // no answer yet
        console.error("must choose answer")
        return;
        // TODO display message
      }
      getNextQuestion(exam.id, localStorageContext.userId, answer).then((data) => {
        if (data == "done") {
          setIsExamFinished(true)
          data = undefined
          setQuestion(undefined)
        }
        else{
          setAnswer(undefined)
          setQuestion(data)
        }
      }).catch((err) => {
        console.log(err)
        });
    }
  }



  // TODO auto submit when times up (ALMOST DONE see `onTimerFinish`)
  // TODO add submit button

  const [isExamFinished, setIsExamFinished] = useState(false);

  function onTimeFinish() {
    console.log("exam finished")
    setIsExamFinished(true)
    // TODO send answers
  }
  // TODO only show exam when recorder is ready
  return (
    <>
      {exam && <>
        <div className="position-sticky bg-primary d-flex justify-content-center" style={{ top: 0, zIndex: 1000 }}>
          <Timer onTimerFinish={onTimeFinish} timerLength={exam.duration * 60} />
        </div>
        <ExamContainer>{question &&
          <>
            <Question_view
              question={question}
              key={question.id}
              onChange={(answer) =>{
                setAnswer(answer)
                console.debug("answer changed")
                console.debug(answer)
              } 
              }
              />
            <Button onClick={handleNext}>next</Button>
          </>
        }</ExamContainer>



        <Recorder examId={exam.id}
          shouldStop={isExamFinished}
          onFinish={() => { router.push(`/student/examination/report/${exam.id}`) }}
          examDuration={exam.duration * 60}
          recordingStarted={recordingStarted}
          />






      </>}
    </>
  )
}
