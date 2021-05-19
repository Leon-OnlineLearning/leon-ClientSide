import Cookie from "js-cookie"
import jwtDecode from "jwt-decode"
import config from "../utils/config"
import apiInstance from "./utils/api"
import { AxiosError } from "axios"

export class InvalidTokenError extends Error {
    constructor() {
        super("Invalid token")
        this.message = "Invalid token"
        this.name = "InvalidTokenError"
    }
}

export const refreshToken = async () => {
    const oldToken = Cookie.get('jwt')
    const refreshToken = window.localStorage.getItem('refreshToken') // not inside react component i can't use the context
    await apiInstance.post(`/auth/refreshToken`, {
        oldToken,
        refreshToken
    })
        .then(response => response.data)
        .then(data => {
            storeUserSession(refreshToken, data.token)
        })
        .catch((err: AxiosError) => {
            if (err.response.status >= 400 && err.response.status < 500)
                throw new InvalidTokenError();
        })
}

/**
 * store tokens and user data (refresh, req) 
 * @param refreshToken 
 * @param token 
 * @param cookieExpirationInterval 
 * @returns wether or not the tokens were stored successfully
 */
export const storeUserSession = (refreshToken: string, token: string) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('refreshToken', refreshToken)
        const userData: any = jwtDecode(token)
        for (let key in userData) {
            localStorage.setItem(key, userData[key])
        }
        return true
    } else {
        return false
    }
}

