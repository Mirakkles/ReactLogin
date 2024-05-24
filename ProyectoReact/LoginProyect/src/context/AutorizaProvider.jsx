import { createContext, useState } from "react"

export const AuthContext = createContext()

const AutorizaProvider = ({children}) => {

    const [auth, setAuth] = useState({})

  return (
    <AuthContext.Provider value={{auth,setAuth}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AutorizaProvider