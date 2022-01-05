import { Route, Routes } from 'react-router-dom'
import CreateUser from './pages/CreateUser'
import BitacoraGasolina from './pages/BitacoraGasolina'
import Home from './pages/Home'
import Login from './pages/Login'
import Reports from './pages/Reports'
import './App.css'

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

export default App;
