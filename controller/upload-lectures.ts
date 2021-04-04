import config from "../utils/config";
import axios from "axios"

export function createNewLecture(formDate, onUploadProgress) {
    return axios.post(`${config.serverBaseUrl}/lectures`, formDate, { onUploadProgress });
}

export function editLecture(formDate, lectureId, onUploadProgress) {

    return axios.put(`${config.serverBaseUrl}/lectures/${lectureId}`, formDate, {
        headers: {
            "Content-type": "multipart/form-data"
        }
        , onUploadProgress
    });
}