/**
 * Why using local storage context instead of useLocalStorage?
 *  1- lazy loading/ storing without hacks 
 *  2- the local storage is a global state which is a perfect fit for contexts
 */
import { createContext } from "react"

const LocalStorageContext = createContext({
    firstName: '',
    lastName: '',
    embeddingSigned: '',
    refreshToken: '',
    userId: '',
    role: '',
    setFirstName: (firstName: string) => {},
    setLastName: (lastName: string) => {},
    setEmbeddingSigned: (embeddingSigned: string) => {},
    setRefreshToken: (refreshToken: string) => {},
    setUserId: (userId: string) => {}
})

export default LocalStorageContext;