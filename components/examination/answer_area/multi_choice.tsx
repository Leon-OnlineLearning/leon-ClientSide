import { useState } from "react";
import { AnswerInterface } from "../../../model/examination/answer";
import { QuestionInterface, Q_type } from "../../../model/examination/question";

export default function MultiChoice({
  question,
  onChange,
}: {
  question: QuestionInterface;
  onChange(AnswerInterface): void;
}) {
  const [selected_answers, setSelectedAnswers] = useState(
    new Set<String>()
  );
  let handleChange = ({ target }) => {
    const new_selected_answers = new Set(selected_answers);
    if (target.checked) {
      new_selected_answers.add(target.value);
    } else {
      new_selected_answers.delete(target.value);
    }
    setSelectedAnswers(new_selected_answers);
    let new_answer: AnswerInterface = {
      questionType: question.questionType,
      answerText: Array.from(new_selected_answers),
    };
    onChange(new_answer);
  };

  return (
    <>
      {question.choices.map((choice) => (
        <div key={choice}>
          <input
            type="checkbox"
            name={choice}
            value={choice}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor={choice}>{choice}</label>
        </div>
      ))}
    </>
  );
}
