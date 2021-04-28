import {useState} from "react"

export function useError(): [boolean, string, (message: string, errorState?: boolean) => void] {
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    function errorSetter(message: string, errorState: boolean = true) {
        setError(errorState)
        setErrorMsg(message)
    }
    return [error, errorMsg, errorSetter]
}
