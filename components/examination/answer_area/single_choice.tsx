import { useState } from "react";
import { TextAnswer } from '../../../../../../dev/test/leon-ClientSide/model/examination/answer';
import { AnswerAreaInterface } from '../../../../../../dev/test/leon-ClientSide/components/examination/answer_area/AnswerAreaInterface';


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
          <>
          <input
            key={choice}
            type="radio"
            name={String(question.questionId)}
            value={choice}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor={choice}>{choice}</label>
        </>
      ))}
    </>
  );
};

export default SingleChoice