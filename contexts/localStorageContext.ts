/**
 * Why using local storage context instead of useLocalStorage?
 *  1- lazy loading/ storing without hacks 
 *  2- the local storage is a global state which is a perfect fit for contexts
 */
import { createContext } from "react"

export interface userDataInterface {
    firstName: string,
    lastName: string,
    embeddingSigned : string
    refreshToken : string
    userId : string
    role : string
}

interface dataSetter {
    setFirstName: (firstName: string) => void,
    setLastName: (lastName: string) => void,
    setEmbeddingSigned: (embeddingSigned: string) => void,
    setRefreshToken: (refreshToken: string) => void,
    setUserId: (userId: string) => void,
    setRole:(role: string) => void
}

const LocalStorageContext = createContext<userDataInterface&dataSetter>({
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
    setUserId: (userId: string) => {},
    setRole:(role: string) => {}
})

export default LocalStorageContext;