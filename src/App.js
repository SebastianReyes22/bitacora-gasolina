import { Route, Routes } from 'react-router-dom'
import CreateUser from './components/CreateUser'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Login from './components/Login'
import './App.css'

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/addUser" element={<CreateUser />} />
    </Routes>
  )
}

export default App;
