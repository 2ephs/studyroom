// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAeCbUM4bdN32didJgB6oldbE87JhHT3k4',
  authDomain: 'today-s-study-room.firebaseapp.com',
  projectId: 'today-s-study-room',
  storageBucket: 'today-s-study-room.appspot.com',
  messagingSenderId: '786058905105',
  appId: '1:786058905105:web:1695e77cf14a88e9c613b0',
  measurementId: 'G-2XP7BTT33G',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
