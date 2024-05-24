import {Routes, Route} from "react-router-dom"
import Home from "../Home"
import Navbar from "../components/Navbar"
import Login from "../views/Login"
import Register from "../views/Register"
import Favoritos from "../views/Favoritos"
import Lista from "../views/Lista"
import RequireAuth from "../RequireAuth"
import Prohibido from "../views/Prohibido"
import Usuarios from "../views/Usuarios"



const AppRouter = () => {

    const routes = [
        {to: "/", linkText: "Home"},
        {to: "/favoritos", linkText: "Favoritos"},
        {to: "/lista", linkText: "Lista"},
        {to: "/registrate", linkText: "Register"},
        {to: "/ingresa", linkText: "Login"},
        {to: "/listausuarios", linkText: "Usuario"}
    ]

  return (
    <>
        <Navbar routes={routes}/>

    <Routes>

      //Rutas generales que todos pueden acceder

    <Route path="/" element={<Home />}/>
    <Route path="/registrate" element={<Register />} />
    <Route path="/ingresa" element={<Login />} />

    <Route element={<RequireAuth RolesPermitidos={["Usuario", "Admin"]}/>}>
         <Route path="/favoritos" element={<Favoritos />} />
         <Route path="/lista" element={<Lista />} />

    </Route>

    
    <Route element={<RequireAuth RolesPermitidos={"Admin"}/>}>
    <Route path="/listausuarios" element={<Usuarios/>} />
    </Route>
    
    <Route path="/no-autorizado" element={<Prohibido/>} />

  </Routes>

  </>
  )
}

export default AppRouter