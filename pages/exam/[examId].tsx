import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Recorder from '../../components/examination/recording/exam_record'
import config from '../../utils/config'



const recordingUrlSecondary = `${config.serverBaseUrl}/exams2/record/secondary`

export default function secondaryCam() {
    const router = useRouter()
    const { examId, studentId, secret } = router.query

    const [isExamFinished, setIsExamFinished] = useState(false)

    const [isRecordDone, setIsRecordDone] = useState(false)
    const [isRecordingStarted, setIsRecordingStarted] = useState(false)

    // TODO check liveness and if exam is done

    return <>{examId && <>
        <Recorder examId={examId as string}
            studentId={studentId as string}
            shouldStop={isExamFinished}
            onFinish={() => {
                setIsRecordDone(true)
            }}
            recordingStarted={isRecordingStarted}
            setRecordingStarted={setIsRecordingStarted}
            recorderUrl={recordingUrlSecondary}
            recordingSecret={secret as string}
            setIsExamFinished={setIsExamFinished}
        />
        {!isRecordingStarted && <h1>please wait checking liveness</h1>}
        {isRecordDone && <h1>done close this tab </h1>}
        </>
    }
    </>

}
