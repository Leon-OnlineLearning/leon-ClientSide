import dynamic from 'next/dynamic'

const Recorder = dynamic(()=>import("../../../components/examination/recording/exam_record"));


export default function Test_page(){
    return <Recorder />
}