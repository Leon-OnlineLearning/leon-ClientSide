import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import AccessDenied from "./access-denied"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps }) {
  if (typeof window === 'undefined') {
    return <Component {...pageProps} />
  }
  const role = localStorage.getItem('role')
  let allowed = true
  const router = useRouter()
  if (router.pathname.startsWith('/student') && role.toLowerCase() !== "student") {
    allowed = false
  }
  if (router.pathname.startsWith('/professor') && role.toLowerCase() !== "professor") {
    allowed = false
  }
  if (router.pathname.startsWith('/admin') && role.toLowerCase() !== "admin") {
    allowed = false
  }
  return (
    allowed ? <Component {...pageProps} /> : <AccessDenied />
  )
}

export default MyApp
