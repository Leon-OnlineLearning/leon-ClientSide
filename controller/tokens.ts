import axios from "axios"
import Cookie from "js-cookie"
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
            storeTokens(data.refreshToken, data.token)
        })
        .catch(err => console.error(err))
}

export const storeTokens = (refreshToken: string, token: string, cookieExpirationInterval: number = 0) => {
    if (cookieExpirationInterval < 0) throw new Error("Expiration interval must be positive or zero");
    Cookie.set('token', token, { expires: cookieExpirationInterval || undefined })
    window.localStorage.setItem('refreshToken', refreshToken)
}