import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDtfgQzXUcDO2h5rvaiha76jz_1i8OcZTQ",
    authDomain: "tasktracker-c4a92.firebaseapp.com",
    projectId: "tasktracker-c4a92",
    storageBucket: "tasktracker-c4a92.appspot.com",
    messagingSenderId: "136366487424",
    appId: "1:136366487424:web:e50d266202e5cd9ca57365",
    measurementId: "G-3X04K7NVM6"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
