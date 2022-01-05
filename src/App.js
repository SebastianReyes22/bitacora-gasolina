import { Route, Routes, BrowserRouter } from 'react-router-dom'
import CreateUser from './components/views/CreateUser'
import BitacoraGasolina from './components/views/BitacoraGasolina'
import Home from './components/views/Home'
import Login from './components/views/Login'
import Reports from './components/views/Reports'
import './App.css'
import BitacoraGasolinaRoute from './components/router/BitacoraGasolinaRoute'

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/bitacora-gasolina" element={<BitacoraGasolina />} />
        
        <Route exact path="/addUser" element={<CreateUser />} />
        <Route exact path="/reportes" element={<Reports />} />
      </Routes>
  )
}

export default App
