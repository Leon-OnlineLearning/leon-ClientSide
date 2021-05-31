import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ExamContainer from '../../../../components/examination/exam_container/ExamContainer';
import Question_view from '../../../../components/examination/Question_view';
import Recorder from '../../../../components/examination/recording/exam_record';
import Timer from '../../../../components/examination/timer/timer';
import { QuestionInterface } from '../../../../model/examination/question';
import { useRouterQuery } from '../../../../hooks/useRouteQuery';
import { StudentDashboard, StudentDashboardSelectedPage } from '../../../../components/student/dashboad/student-dashboard';
import { Spinner } from 'react-bootstrap';
import { getExamById } from '../../../../controller/exam/exam';


export default function FormViewer() {


  const [examId, queryChecked] = useRouterQuery("examId")
  const [questions, setQuestions] = useState([])
  useEffect(() => {
    const _getExam = async () => {
      const exam = await getExamById(examId)
      setQuestions(exam.questions)
    }
    if (examId){
      _getExam()
    }
  }, [examId])


  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  function handleChange(index, user_answer) {
    let new_answers = answers.slice();
    new_answers[index] = user_answer
    setAnswers(new_answers)
    console.log(new_answers)
  }
  let questions_comp = questions.map((question, index) => {
    return <Question_view question={question} key={question.questionId} onChange={(answer) => handleChange(index, answer)} />
  })
  
  const router = useRouter()
  // TODO get test length
  // TODO auto submit when times up (ALMOST DONE see `onTimerFinish`)
  // TODO add submit button

  function onExamFinish(){
    console.log("exam finished")
    // TODO redirect only when 
    // router.push('/student/report')
  }
  return (
    <>
      <div className="position-sticky bg-primary d-flex justify-content-center" style={{ top: 0, zIndex: 1000 }}>
        <Timer onTimerFinish={onExamFinish} timerLength={12} />
      </div>

      <ExamContainer>{questions_comp}</ExamContainer>
      {
        queryChecked ?
          <Recorder examId={examId} /> :
          <Spinner animation="border" variant="primary" />
      }

    </>
  )
}

// This function gets called at build time
// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//     // const res = await fetch("http://localhost:45621/exams");
//     // const exams = await res.json();

//     // const exams = db.json
//   const exams = db.exams
//   // Get the paths we want to pre-render based on exams
//   const paths = exams.map((exam) => ({
//     params: { examId: String(exam.id) },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

// // This also gets called at build time
// export async function getStaticProps({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   // const res = await fetch(`http://localhost:45621/exams/${params.id}`);
//   const exam = db.exams;

//   // Pass exam data to the page via props
//   return { props: { ...exam },revalidate: 1 };
// }