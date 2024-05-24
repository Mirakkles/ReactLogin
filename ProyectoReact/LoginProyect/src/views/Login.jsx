import {useEffect, useRef, useState } from "react"
import { AuthContext } from "../context/AutorizaProvider"
import axios from "../api/axios"
import useAuth from "../hooks/useAuth"
import { Link, useLocation, useNavigate } from "react-router-dom"


const Login = () => {

    const LOGIN = '/login'
    const {auth, setAuth} = useAuth()

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const errRef = useRef()



    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {

      setErrMsg('')

    }, [user, pass])


    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await axios.post(
              LOGIN,
              {
                  Nombre_Usuario: user,
                  Pass: pass
              },
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
          );

          if (response) {
            const token = response.data?.acessToken;
            const rol =response.data?.Rol;
            setAuth({ user, pass, rol, token });
            setUser('');
            setPass('');
            navigate(from, { replace: true});
        } else {
            console.log("Waiting...");
        }

          
      } catch (err) {
          if (err.response) {

              setErrMsg(err.response.data.error || 'Error de Servidor');
          } else {
              setErrMsg('Error Cliente');
          }
      }
  };
    
    
  return (


<section>

    <div className="card">
    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>

    <div className="card-header">INGRESA TUS DATOS</div>
    <br/>

    <form onSubmit={handleSubmit}>

        <label htmlFor="username">USUARIO:</label>
        <input 
        type="text" 
        id="username"
        autoComplete="off"
        onChange={(e) => setUser(e.target.value)} 
        value={user}
        required/>

        <br/>

        <label htmlFor="password">CONTRASEÑA:</label>
        <input 
        type="password" 
        id="password"
        onChange={(e) => setPass(e.target.value)} 
        value={pass}
        required/>

        <br/>

        <button disabled={!user || !pass ? true : false}>Ingresa</button>


    </form>

    <p>Necesitas una cuenta?<br/>
    Registrate!</p>
    </div></section>

  )
}

export default Login