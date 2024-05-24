import { useRef } from "react";
import { useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import axios  from "../api/axios";


const USER_REGEX = /^[a-zA-Z0-9_-]{3,10}$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,24}$/;
const REGISTER_URL = '/users'

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("")
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState(null)
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState("")
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [sucess, setSucess] = useState(false)



    useEffect(() => {
      const result = USER_REGEX.test(user)
      const result2 = PWD_REGEX.test(pwd)
      const match = pwd === matchPwd
      setValidPwd(result2)
      setValidName(result)
      setValidMatch(match)
      

    }, [user, pwd, matchPwd])

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const v = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if(!v||!v2){
          alert("los campos no fueron llenados correctamente")

        }
        console.log(pwd && user);

        try{ 
          const response = await axios.post(REGISTER_URL,
           JSON.stringify({ 
            Nombre_Usuario: user,
            Pass: pwd}),
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      );
      console.log(response.data)
      setSucess(true);
    }
        catch(err){
          console.log(err)
        }
    }


    

  return (
    <>

    {sucess ? (<section>
      <h1>Exito en el Registro!
        <p>Redirigir al login</p>
      </h1>
    </section>): (<section>
      <div className="card">
    <div className="card-header">INGRESA TUS DATOS</div>
    <br/>
    <form onSubmit={handleSubmit}>
        <label htmlFor="username">NOMBRE DE USUARIO : </label>
        <br/>
        <input
        type="text"
        id="username"
        ref={userRef}
        autoComplete="off"
        onChange={(e) => setUser(e.target.value)}
        onFocus={() =>setUserFocus(true)}
        onBlur={() =>setUserFocus(false)}
        />
        <span className={!validName  && userFocus? "valid" : "offscreen"}>
        <FontAwesomeIcon icon={faCircleXmark} />
        </span>
        <span className={validName ? "valid" : "offscreen"}>
        <FontAwesomeIcon icon={faCheckCircle} />   
        </span>
        <p className={!validName && userFocus ? "instrucciones" : "offscreen"}>
            4 a 11 letras <br/>
            Debe contener letras
        </p>

        <label htmlFor="contrasena">CONTRASEÑA : </label>
        <br/>
        <input
        type="password"
        id="contrasena"
        onChange={(e) => setPwd(e.target.value)}
        onFocus={() =>setPwdFocus(true)}
        onBlur={() =>setPwdFocus(false)}
        />

        <span className={!validPwd  && pwdFocus? "valid" : "offscreen"}>
        <FontAwesomeIcon icon={faCircleXmark} />
        </span>
        <span className={validPwd? "valid" : "offscreen"}>
        <FontAwesomeIcon icon={faCheckCircle} />   
        </span>
        <p className={!validPwd && pwdFocus ? "instrucciones" : "offscreen"}>
            Minimo 8 Digitos <br/>
            Debe tener una mayuscula, una minuscula y un numeral
        </p>

        <label htmlFor="Rcontraseña">REPETIR CONTRASEÑA : </label>
        <br/>
        <input
        type="password"
        id="Rcontraseña"
        ref={userRef}
        autoComplete="off"
        onChange={(e) => setMatchPwd(e.target.value)}
        onFocus={() =>setMatchFocus(true)}
        onBlur={() =>setMatchFocus(false)}
        />

        <span className={!validMatch && matchFocus? "valid" : "offscreen"}>
        <FontAwesomeIcon icon={faCircleXmark} />
        </span>
        <span className={validMatch && matchPwd ? "valid" : "offscreen"}>
        <FontAwesomeIcon icon={faCheckCircle} />   
        </span>

    <p className={!validMatch && matchFocus ? "instrucciones" : "offscreen"}>
            Las Contraseñas no calzan!
        </p>

        <button disabled={!validName || !validPwd || !validMatch ? true : false} type="submit">Registrar</button>
    </form>
    </div>
    </section>)}
   
    </>

  )
}

export default Register