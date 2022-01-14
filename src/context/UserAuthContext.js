import { createContext, useEffect, useState, useContext } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChange,
} from 'firebase/auth';
import { auth } from '../auth/firebase';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState('');

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsuscribe = onAuthStateChange(auth, currentUser => {
      setUser(currentUser);
    });
    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={}>{children}</userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
