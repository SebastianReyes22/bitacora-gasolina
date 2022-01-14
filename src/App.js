import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CreateUser from './components/views/CreateUser';
import BitacoraGasolina from './components/views/BitacoraGasolina';
import Home from './components/views/Home';
import Login from './components/views/Login';
import Reports from './components/views/Reports';
import DeleteUser from './components/views/DeleteUser';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter basename='/bitacora-gasolina'>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/inicio' element={<Home />} />
        <Route exact path='/bitacoras' element={<BitacoraGasolina />} />
        <Route exact path='/agregarUsuario' element={<CreateUser />} />
        <Route exact path='/reportes' element={<Reports />} />
        <Route exact path='/eliminarUsuario' element={<DeleteUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
