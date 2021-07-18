import { useState } from "react";
import { TextAnswer } from "../../../model/examination/answer";
import { AnswerAreaInterface } from './AnswerAreaInterface';


let Option =({choice,handleChange})=>(
  <div className="form-check">
  <input
  className="form-check-input"
  type="checkbox"
  value={choice}
  onChange={handleChange}
/>
<label htmlFor={choice} className="form-check-label">{choice}</label>
</div>
)

let MultiChoice: AnswerAreaInterface = ({ question, onChange }) => {
  const [selected_answers, setSelectedAnswers] = useState(new Set<String>());
  
  let handleChange = ({ target }) => {
    /**
     * update the answer by the changed checkbox
     */
    
     //create copy and update selected_answers
    const new_selected_answers = new Set(selected_answers);
    if (target.checked) {
      new_selected_answers.add(target.value);
    } else {
      new_selected_answers.delete(target.value);
    }
    setSelectedAnswers(new_selected_answers);
    
    // callback the onChange
    let new_answer = new TextAnswer(question, Array.from(new_selected_answers))
    onChange(new_answer);
  };

  return (
    <>
      {question.choices.map((choice) => (
        
     <Option key={choice} choice={choice} handleChange={handleChange} />
        
      ))}
    </>
  );
};

export default MultiChoice