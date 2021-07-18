import {  TextAnswer } from "../../../model/examination/answer";
import {  Q_type } from "../../../model/examination/question";
import { AnswerAreaInterface } from "./AnswerAreaInterface";
import MultiChoice from "./multi_choice";
import SingleChoice from './single_choice';
import MultipleChoiceContainer from './MutibleChoiceContainer';
import CodeAnswer from "./CodeAnswer";

let AnswerArea: AnswerAreaInterface = ({ question, onChange }) => {
  return (
  <div className="p-2 ">
  <AnswerAreaSwitch question={question} onChange={onChange} />
  </div>
  )
};

let AnswerAreaSwitch = ({ question, onChange }) => {
  
  let handleChange = (e) => {
    onChange(new TextAnswer(question, e.target.value));
  };
  
  switch (question.questionType) {
    case Q_type.MultiChoice:
      return <MultipleChoiceContainer>
        <MultiChoice question={question} onChange={onChange} />
      </MultipleChoiceContainer>
      
      
    case Q_type.SingleChoice:
      return <MultipleChoiceContainer>
        <SingleChoice question={question} onChange={onChange} />
      </MultipleChoiceContainer>
    case Q_type.ShortAnswer:
      return <input type="text" className="ml-3 d-block w-75" onChange={handleChange} />;
    case Q_type.LongAnswer:
      return <textarea  className="ml-3 d-block w-75" onChange={handleChange} />;
    case Q_type.Code:
      return <CodeAnswer question={question} onChange={onChange}/>
      case Q_type.Image:
      // TODO upload the file and add its link
      return <input
        type="file"
        name={String(question.questionId)}
        onChange={handleChange}
      />;
    default:
      <p>invalid answer type </p>;
  }
}
export default AnswerArea