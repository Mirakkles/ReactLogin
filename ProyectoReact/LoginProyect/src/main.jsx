import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from "react-router-dom"
import AutorizaProvider from './context/AutorizaProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AutorizaProvider>
    <App />
    </AutorizaProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
