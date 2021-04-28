import axios from "axios"
import Cookie from "js-cookie"
import jwtDecode from "jwt-decode"
import config from "../utils/config"

export const refreshToken = () => {
    const oldToken = Cookie.get('token')
    const refreshToken = window.localStorage.getItem('refreshToken')
    axios.post(`${config.serverBaseUrl}/auth/refreshToken`, {
        oldToken,
        refreshToken
    })
        .then(response => response.data)
        .then(data => {
            storeUserSession(data.refreshToken, data.token)
        })
        .catch(err => console.error(err))
}

/**
 * store tokens and user data (refresh, req) 
 * @param refreshToken 
 * @param token 
 * @param cookieExpirationInterval 
 * @returns wether or not the tokens were stored successfully
 */
export const storeUserSession = (refreshToken: string, token: string, cookieExpirationInterval: number = 0) => {
    if (cookieExpirationInterval < 0) throw new Error("Expiration interval must be positive or zero");
    Cookie.set('token', token, { expires: cookieExpirationInterval || undefined })
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
