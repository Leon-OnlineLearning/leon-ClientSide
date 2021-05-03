import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import AccessDenied from "./access-denied"
import { useRouter } from "next/router"
import LoginPage from './login'

function MyApp({ Component, pageProps }) {
  if (typeof window === 'undefined') {
    return <Component {...pageProps} />
  }
  const role = localStorage.getItem('role')
  let allowed = true
  const router = useRouter()
  console.log(router.pathname);

  console.log(role);

  if (!role) {
    if (router.pathname !== "/login" && router.pathname !== "/") {
      // TODO a cheap trick to prevent overflow
      router.push('/login')
      return <div></div>
    }
  }

  if (router.pathname.startsWith('/student')) {
    if (role && role.toLowerCase() !== "student") {
      allowed = false
    } else {
      const embeddingSigned = localStorage.getItem('embedding-signed')
      if (!embeddingSigned) {
        router.push("/sendEmbedding")
        return <div>hello</div>
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
    allowed ? <Component {...pageProps} /> : <AccessDenied />
  )
}

export default MyApp
