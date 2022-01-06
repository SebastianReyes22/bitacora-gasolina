import { Route, Routes, BrowserRouter } from 'react-router-dom'
import CreateUser from './components/views/CreateUser'
import BitacoraGasolina from './components/views/BitacoraGasolina'
import Home from './components/views/Home'
import Login from './components/views/Login'
import Reports from './components/views/Reports'
import DeleteUser from './components/views/DeleteUser'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/bitacora-gasolina" element={<BitacoraGasolina />} />
        <Route exact path="/addUser" element={<CreateUser />} />
        <Route exact path="/reportes" element={<Reports />} />
        <Route exact path="/eliminarUsuario" element={<DeleteUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
