import { Route, Routes } from 'react-router-dom'
import CreateUser from './components/CreateUser'
import BitacoraGasolina from './components/BitacoraGasolina'
import Home from './components/Home'
import Login from './components/Login'
import Reports from './components/Reports'
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
