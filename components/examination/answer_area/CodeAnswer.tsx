import dynamic from 'next/dynamic';
const CodeMirror = dynamic(() => {
  require("codemirror/lib/codemirror.css");
  require("codemirror/theme/neat.css");
  // require("codemirror/mode/xml/xml.js");
  require("codemirror/mode/javascript/javascript.js");
// TODO load the selected language
  // require('codemirror/mode/css/css');  
  
  
  return import("react-codemirror2").then(mode => mode.UnControlled)},{ssr:false});


// import { UnControlled as CodeMirror } from "react-codemirror2";
import { AnswerAreaInterface } from './AnswerAreaInterface';
import { TextAnswer } from '../../../model/examination/answer';

let CodeAnswer:AnswerAreaInterface = ({question, onChange}) =>{
  const options = {
    mode: question.code_lang,
    theme: 'neat',
  }

  
  return (<CodeMirror
      className="border z-index=1"
      options={options}
      onChange={(editor, data, value) => {
        
        onChange(new TextAnswer(question, value));
      }}
    />
    );
}


export default CodeAnswer