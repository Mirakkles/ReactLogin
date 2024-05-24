import { useNavigate } from "react-router-dom"



const Prohibido = () => {

    const navigate = useNavigate();
    const back = () => navigate(-1);

  return (<>
    <div>No tienes los permisos para ingresar a esta pagina</div>

    <button onClick={back}>ir a donde estabas</button>
    </>
  )
}

export default Prohibido