import axios, { AxiosAdapter, AxiosError, AxiosResponse } from "axios";
import config from "../../utils/config";
import { refreshToken } from "../tokens";
import UserInputError from "./UserInputError";


const apiInstance = axios.create({
    baseURL: config.serverBaseUrl,
});

apiInstance.interceptors.response.use((response: AxiosResponse) => response,
    async (err: AxiosError) => {
        const response = err.response;
        const originalRequest = err.config;
        if (response.status === 401 && response.data.message === "Invalid or expired Token") {
            await refreshToken()
            return apiInstance(originalRequest);
        }
        else if (response.status === 400) {
            throw new UserInputError(response.data.message);
        } 
        else {
            throw err;
        }
    });

export default apiInstance;