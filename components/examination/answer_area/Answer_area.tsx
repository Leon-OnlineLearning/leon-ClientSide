import { AnswerInterface, TextAnswer } from "../../../model/examination/answer";
import { QuestionInterface, Q_type } from "../../../model/examination/question";
import { AnswerAreaInterface } from "./AnswerAreaInterface";
import MultiChoice from "./multi_choice";
import SingleChoice from './single_choice';

let AnswerArea: AnswerAreaInterface = ({ question, onChange }) => {
  let handleChange = (e) => {
    onChange(new TextAnswer(question, e.target.value));
  };

  switch (question.questionType) {
    case Q_type.MultiChoice:
      return <MultiChoice question={question} onChange={onChange} />;
    case Q_type.SingleChoice:
      return <SingleChoice question={question} onChange={onChange} />;
    case Q_type.ShortAnswer:
      return <input type="text" onChange={handleChange} />;
    case Q_type.LongAnswer:
    case Q_type.Code: //TODO use a code highlight
      return <textarea onChange={handleChange} />;
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
};

export default AnswerArea