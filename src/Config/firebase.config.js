// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNf9Dmb9hHqaZsBESIqys-Nz-8ivWX5a4",
  authDomain: "blog-website-fb267.firebaseapp.com",
  projectId: "blog-website-fb267",
  storageBucket: "blog-website-fb267.appspot.com",
  messagingSenderId: "632775510569",
  appId: "1:632775510569:web:c337334ea75d82e0b52a38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;