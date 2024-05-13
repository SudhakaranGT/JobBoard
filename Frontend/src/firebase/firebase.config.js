// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAwPsIGBYZKDWfpp1bE8WfMEdWQSf4SkU",
  authDomain: "sem-6-job-portal.firebaseapp.com",
  projectId: "sem-6-job-portal",
  storageBucket: "sem-6-job-portal.appspot.com",
  messagingSenderId: "583224111151",
  appId: "1:583224111151:web:a5619ba0b0bd24155796da",
  measurementId: "G-JYKTRZ7DPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
