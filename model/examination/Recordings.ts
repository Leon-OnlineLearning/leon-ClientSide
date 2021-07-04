

export interface ExamRecordingInterface {
    recordedChunks: Blob[]
    userId: string
    examId: string
    chunckIndex: number
    startingFrom: number
    endingAt: number
    isLastChunk: boolean
}

export interface RefranceRecordingInterface {
    recordedChunks: Blob[]
    userId: string
}