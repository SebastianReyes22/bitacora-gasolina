import React from 'react'
import { Navigate, Route } from 'react-router-dom'

export default function BitacoraGasolinaRoute(props){
  const isAuthenticated = false

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <Route {...props} />
}
