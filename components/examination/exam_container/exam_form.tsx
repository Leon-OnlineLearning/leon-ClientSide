
import router from "next/router";
import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import LocalStorageContext from "../../../contexts/localStorageContext";
import { getCurrentQuestion, getNextQuestion, sendLivenessMark } from "../../../controller/exam/exam";
import { Exam } from "../../../model/Exam";
import { TextAnswer } from "../../../model/examination/answer";
import { QuestionInterface } from "../../../model/examination/question";
import LivenessCheck from "../gesture/livenss_check";
import Question_view from "../Question_view";
import Recorder from "../recording/exam_record";
import Timer from "../timer/timer";
import ExamContainer from "./ExamContainer";




// TODO get this from backend
const livenessCheckDuration = 10 // in seconds
const img_url = '/backend/static/sign_digits/example_3.jfif'



/**
 * Exams form 
 * 
 * exam events
 * a timer start counting down from exam duration
 * another time start counting up from zero
 * every chunk_duration a chunk is sent to backend
 * 
 * a liveness event can come from the backend
 * during the check
 *     counting down timer will freeze
 *     counting up timer will continue
 *     the question view area will switch to an image and a camera view
 *     after liveness_duration seconds the
 *         the down timer will continue
 *         a request is send to the backend with the time mark
 *         the question view area will switch back to question automatically
 * @param props 
 * @returns  
 */
export default function ExamForm  (props:{exam:Exam}) {
    const [question, setQuestion] = useState<QuestionInterface>()
    const [answer, setAnswer] = useState<TextAnswer>()
  
    const localStorageContext = useContext(LocalStorageContext)
  
    // get exam info
    const exam = props.exam
    

    // TODO print question number  
  
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
          else {
            setAnswer(undefined)
            setQuestion(data)
            setCounter(counter => counter + 1)
            if (counter == 2) {
              // TODO get number of question
              // FIXME this is a hack get the check time from backend
              setCheckLiveness(true)
            }
          }
        }).catch((err) => {
          console.log(err)
        });
      }
    }
  
    const [counter, setCounter] = useState(0)
  
    const [checkLiveness, setCheckLiveness] = useState(false)
    // exam duration every five minutes
    // exam duration every from ten to twenty minutes
  
    // number of questions (0.2)
    useEffect(() => {
      // set checkLiveness to false after time
      if (checkLiveness == true) {
        setFreezeTime(true)
        console.log(`time sec ${count_up_time}`)
        setTimeout(() => {
          setCheckLiveness(false)
          // send the time mark to backend
          sendLivenessMark(
            localStorageContext.userId,
            exam.id,
            count_up_time,
            count_up_time+livenessCheckDuration)
          console.debug(`sending ${count_up_time}, ${count_up_time+livenessCheckDuration}`)
        }, 1000 * livenessCheckDuration)
      }
    }, [checkLiveness])
  
  
  
  
    // TODO auto submit when times up (ALMOST DONE see `onTimerFinish`)
  
    const [isExamFinished, setIsExamFinished] = useState(false);
    function onTimeFinish() {
      console.log("exam finished")
      handleNext()
      setIsExamFinished(true)
    }
    
    // TODO only show exam when recorder is ready
    const [recordingStarted, setRecordingStarted] = useState(false);
  
  
    const viewQuestion = question && !checkLiveness
    
    const [freezeTime, setFreezeTime] = useState(false)
    const [count_down_time, setCountDownTime] = useState(exam.duration*60)
    
    

    // counter 
    const [count_up_time, setCountUpTime] = useState(0) //needed to mark liveness check
    useEffect(() => {
        if (recordingStarted) {
            setInterval(() => {
                setCountUpTime(t => t+1)
            }, 1000)
        }
    },[recordingStarted])

    return (
      <>
      {recordingStarted && <>
          <div className="position-sticky bg-primary d-flex justify-content-center" style={{ top: 0, zIndex: 1000 }}>
            <Timer 
            onTimerFinish={onTimeFinish} 
            timerLength={exam.duration*60} 
            shouldFreeze={freezeTime}
            freeze_duration={livenessCheckDuration}
            time_secs={count_down_time}
            setTimeSecs={setCountDownTime}
            />
          </div>
          <ExamContainer>
            {viewQuestion &&
              <>
                <Question_view
                  question={question}
                  key={question.id}
                  onChange={(answer) => {
                    setAnswer(answer)
                    // console.debug("answer changed")
                    // console.debug(answer)
                  }
                  }
                />
                <Button onClick={handleNext}>next</Button>
              </>
  
            }
            {checkLiveness &&
              <LivenessCheck checkLiveness={checkLiveness} img_url={img_url} 
              />
            }
          </ExamContainer>
      </>}
          <Recorder examId={exam.id}
            shouldStop={isExamFinished}
            onFinish={() => { router.push(`/student/examination/report/${exam.id}`) }}
            examDuration={exam.duration * 60}
            recordingStarted={recordingStarted}
            setRecordingStarted={setRecordingStarted}
          /> 
      </>
    )
}