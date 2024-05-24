import { useEffect, useState } from "react"
import axios from "../api/axios"

const Usuarios =  () => {

  const [userList, setUserList] = useState([])

  useEffect( () => {

    const traerDatos = async () => {
    try{
   const response = await axios.get('/users')
   setUserList(response.data)
   console.log(response.data)
  }
   catch(err){
    console.log("problemas al traer datos")
   }
  }

  traerDatos();

  }, [])

  const handlerDeleter = async(id) => {
    try{
    await axios.delete('/users/'+id)
    }
    catch(err){
    console.log(err)
    }

  }
  


  return (<>

  <br/>
    <h1>Lista de Usuarios</h1>

    <div className="list-group">

  {userList.map((i) =><ul className="list-group list-group-horizontal" key={i.ID}>
  <li className="list-group-item">{i.ID}</li>
  <li className="list-group-item">{i.Nombre_Usuario}</li>
  <li className="list-group-item"><button>Eliminar</button></li>
</ul>)}
  </div>

  </>
  )
}

export default Usuarios