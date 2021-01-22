import { QuestionInterface } from "../../../model/examination/question";

/**
 * Answer area interface
 */
export interface AnswerAreaInterface {
    ({
        question,
        onChange,
      }: AnswerAreaPropsInterface):JSX.Element
        
}

/**
 * Answer area props interface
 * @param question 
 * @param onChange - callback function takes the answer onChange
 */
interface AnswerAreaPropsInterface { 
    question: QuestionInterface;
    onChange(AnswerInterface): void;
  }