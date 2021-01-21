import { QuestionInterface, Q_type } from "../../../model/examination/question";

export default function MultiChoice({
  question,
}: {
  question: QuestionInterface;
}) {
  return (
    <>
      <div>
        {question.choices.map((choice) => (
          <div key={choice}>
          <input type="checkbox" name={choice} value={choice} />
          <label htmlFor={choice}>{choice}</label>
          </div>
        ))}
      </div>
    </>
  );
}
