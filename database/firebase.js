// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-analytics.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyABgOoovwtt91LTYXTr8mtmJcyAfhCujXg',
  authDomain: 'bitacora-gasolina-auth.firebaseapp.com',
  projectId: 'bitacora-gasolina-auth',
  storageBucket: 'bitacora-gasolina-auth.appspot.com',
  messagingSenderId: '644408141973',
  appId: '1:644408141973:web:85d32eb2617efc67ce139c',
  measurementId: 'G-JS7RGQHDW6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
