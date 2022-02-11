import { createContext, useEffect, useState, useContext } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../auth/firebase';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [userRol, setUserRol] = useState({});

  //Login
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //Sigup
  async function sigUp(email, password, role) {
    const infoUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await setDoc(doc(firestore, 'users', `${infoUser.user.uid}`), {
      email: email,
      role: role,
      password: password,
    });
  }

  //Logout
  function logOut() {
    return signOut(auth);
  }

  //Get user rol
  async function getRol(uid) {
    const docRef = doc(firestore, 'users', `${uid}`);
    const docData = await getDoc(docRef);
    const userInfoRol = docData.data().role;
    return userInfoRol;
  }

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      getRol(currentUser.uid).then(rol => {
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          rol: rol,
        };
        setUserRol(userData);
      });
    });
  }, []);

  return (
    <userAuthContext.Provider value={{ user, logIn, logOut, sigUp, userRol }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
