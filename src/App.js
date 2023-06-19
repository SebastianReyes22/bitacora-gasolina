import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/routes/ProtectedRoute';
import { Login } from './components/views/Login';
import PageNotFound from './components/views/PageNotFound';
import {
  AddUser,
  BitacoraGasolina,
  CreateUser,
  DeleteUser,
  Reports,
} from './components/views/bitacora';
import { Home, DeleteLog } from './components/views/caseta';
import { UserAuthContextProvider } from './context/UserAuthContext';

function App() {
  return (
    <BrowserRouter basename='/reportes-gasolina'>
      <UserAuthContextProvider>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/inicio' element={<Home />} />
          <Route exact path='/delete-log' element={<DeleteLog />} />
          <Route
            exact
            path='/bitacoras'
            element={
              <ProtectedRoute>
                <BitacoraGasolina />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/agregarUsuario'
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/reportes'
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/eliminarUsuario'
            element={
              <ProtectedRoute>
                <DeleteUser />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/addUser'
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
