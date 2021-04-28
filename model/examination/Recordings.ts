

export interface ExamRecordingInterface{
    recordedChunks : Blob[]
    userId : string
    examId : string
    chunckIndex : number

}

export interface RefranceRecordingInterface{
    recordedChunks : Blob[]
    userId : string
}