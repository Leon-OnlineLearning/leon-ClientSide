import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import AccessDenied from "./access-denied"
import { useRouter } from "next/router"
import LoginPage from './login'
import { Spinner } from 'react-bootstrap'
import LocalStorageContext from "../contexts/localStorageContext"
import { useState } from 'react'

function MyApp({ Component, pageProps }) {

  if (typeof window === 'undefined') {
    return <Component {...pageProps} />
  }
  // local storage context content
  // added state not to override window.localStorage
  // if window is undefined it will be caught by a previous if statement
  const [localStorageState, setLocalStorageState] = useState({
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    refreshToken: localStorage.getItem('refreshToken'),
    userId: localStorage.getItem('id'),
    embeddingSigned: localStorage.getItem('embedding-signed'),
    role: localStorage.getItem('role')
  });

  const setter = (key: string, value: string) => {
    setLocalStorageState(oldState => {
      return { ...oldState, [key]: value }
    });
    localStorage.setItem(key, value);
  }

  let allowed = true
  const router = useRouter()
  console.log(router.pathname);

  console.log(localStorageState.role);

  if (!localStorageState.role) {
    if (router.pathname !== "/login" && router.pathname !== "/") {
      // TODO a cheap trick to prevent overflow
      router.push('/login')
      return <Spinner animation="border" variant="primary" />
    }
  }

  const role  = localStorageState.role

  if (router.pathname.startsWith('/student')) {
    if (role && role.toLowerCase() !== "student") {
      allowed = false
    } else {
      const embeddingSigned = localStorageState.embeddingSigned
      if (!embeddingSigned) {
        router.push("/sendEmbedding")
        return <Spinner animation="border" variant="primary" />
      }
    }
  }
  if (router.pathname.startsWith('/professor') && role.toLowerCase() !== "professor") {
    allowed = false
  }
  if (router.pathname.startsWith('/admin') && role.toLowerCase() !== "admin") {
    allowed = false
  }

  return (
    <LocalStorageContext.Provider value={{
      embeddingSigned: localStorageState.embeddingSigned,
      firstName: localStorageState.firstName,
      refreshToken: localStorageState.refreshToken,
      lastName: localStorageState.lastName,
      userId: localStorageState.userId,
      role: localStorageState.role,
      setEmbeddingSigned(embeddingSigned: string) {
        setter('embedding-signed', embeddingSigned)
      },
      setFirstName(firstName: string) {
        setter('firstName', firstName)
      },
      setLastName(lastName: string) {
        setter('lastName', lastName)
      },
      setRefreshToken(refreshToken: string) {
        setter('refreshToken', refreshToken)
      },
      setUserId(userId: string) {
        setter('userId', userId)
      }
    }}>
      { allowed ? <Component {...pageProps} /> : <AccessDenied />}
    </LocalStorageContext.Provider>
  )
}

export default MyApp
