// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_7zU_Q_kbrYB-HKAhtlR6SDErsBHRgFo",
  authDomain: "nate-bi.firebaseapp.com",
  databaseURL: "https://nate-bi-default-rtdb.firebaseio.com",
  projectId: "nate-bi",
  storageBucket: "nate-bi.appspot.com",
  messagingSenderId: "355884350132",
  appId: "1:355884350132:web:830ad61aa3b9d6d258f5e1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

/* // Initialize Realtime Database and get a reference to the service
const database = getDatabase(app); */

export default firebaseApp;
