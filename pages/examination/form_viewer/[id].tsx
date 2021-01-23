import ExamContainer from '../../../components/examination/exam_container/ExamContainer';
import Question_view from '../../../components/examination/Question_view';
import { QuestionInterface } from '../../../model/examination/question';
export default function Form_viewer({id,questions}:{id:number,questions:Array<QuestionInterface>}) {
  // console.log(questions)  
  let questions_comp= questions.map((question)=>{
    return <Question_view question={question} key={question.questionId}/>
    })
  
  return   <ExamContainer>{questions_comp}</ExamContainer>;

}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
    const res = await fetch("http://localhost:45621/exams");
    const exams = await res.json();
    
    

  // Get the paths we want to pre-render based on exams
  const paths = exams.map((exam) => ({
    params: { id: String(exam.id) },
  }));
  
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`http://localhost:45621/exams/${params.id}`);
  const exam = await res.json();

  // Pass exam data to the page via props
  return { props: { ...exam },revalidate: 1 };
}