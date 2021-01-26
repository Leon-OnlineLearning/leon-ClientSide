import { Http2ServerRequest } from "http2"
import axios from "./utils/common-axio-instance"

export function createNewLecture(formDate, onUploadProgress) {
    return axios.post('/lectures', formDate, {onUploadProgress});
}

export function editLecture(formDate, lectureId, onUploadProgress) {
    
    return axios.put(`/lectures/${lectureId}`, formDate, {
        headers: {
            "Content-type": "multipart/form-data"
        }
        , onUploadProgress
    });
}