

export interface ExamRecordingInterface {
    recordedChunks: Blob[]
    userId: string
    examId: string
    chunckIndex: number
    startingFrom: number
    endingAt: number
}

export interface RefranceRecordingInterface{
    recordedChunks : Blob[]
    userId : string
}