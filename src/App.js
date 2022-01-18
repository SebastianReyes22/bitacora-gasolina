import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CreateUser from './components/views/CreateUser';
import BitacoraGasolina from './components/views/BitacoraGasolina';
import ProtectedRoute from './components/routes/ProtectedRoute';
import Home from './components/views/Home';
import Login from './components/views/Login';
import Reports from './components/views/Reports';
import DeleteUser from './components/views/DeleteUser';
import PageNotFound from './components/views/PageNotFound';
import AddUser from './components/views/AddUser';
import { UserAuthContextProvider } from './context/UserAuthContext';

function App() {
  return (
    <BrowserRouter basename='/bitacora-gasolina'>
      <UserAuthContextProvider>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/inicio' element={<Home />} />
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
