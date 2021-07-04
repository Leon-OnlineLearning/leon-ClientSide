import { useState } from "react";
import { TextAnswer } from '../../../model/examination/answer';
import { AnswerAreaInterface } from '../../../components/examination/answer_area/AnswerAreaInterface';


let Option =({question, choice,handleChange})=>(
  <div  className="form-check">
  <input
  className="form-check-input"
  type="radio"
  name={String(question.questionId)}
  value={choice}
  onChange={handleChange}
/>
<label htmlFor={choice} className="form-check-label">{choice}</label>
</div>
)


let SingleChoice: AnswerAreaInterface = ({ question, onChange }) => {
  const [selected_answer, setSelectedAnswer] = useState(new String);
  
  let handleChange = ({ target }) => {
    /**
     * update the answer by the changed radio
     */
    
     //create copy and update selected_answers
    setSelectedAnswer(target.value);
    
    // callback the onChange
    onChange(new TextAnswer(question,target.value));
  };

  return (
    <>
      {question.choices.map((choice) => (
        <Option key={choice} question={question} choice={choice} handleChange={handleChange} />
      ))}
    </>
  );
};

export default SingleChoice