import { useState } from 'react'
import './App.css'
import Register from './views/Register'
import Login from './views/Login'
import AppRouter from './router/AppRouter'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AppRouter />

    </>
  )
}

export default App
