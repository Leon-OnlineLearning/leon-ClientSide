// https://stackoverflow.com/questions/57323350/how-to-implement-react-hook-socketio-in-next-js

import { useEffect, useState } from "react"
import io from 'socket.io-client'


export default function useSocket(url) {
    const [socket, setSocket] = useState(null)
  
    useEffect(() => {
      const socketIo = io(url)
  
      setSocket(socketIo)
  
      function cleanup() {
        socketIo.disconnect()
      }
      return cleanup
  
      // should only run once and not on every re-render,
      // so pass an empty array
    }, [])
  
    return socket
  }
  