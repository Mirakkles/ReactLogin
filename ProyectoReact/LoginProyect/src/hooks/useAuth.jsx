import { useContext } from "react"
import { AuthContext } from "../context/AutorizaProvider"



const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth