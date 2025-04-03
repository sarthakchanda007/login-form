import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCF93tfozXYAmPDTyuWU1Ct4TQM864ODB4",
    authDomain: "login-10468.firebaseapp.com",
    projectId: "login-10468",
    storageBucket: "login-10468.firebasestorage.app",
    messagingSenderId: "595692231374",
    appId: "1:595692231374:web:92a8594840cac344cc8e9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//email login
const submit = document.getElementById('signin-btn');
submit.addEventListener('click', (event)=>
{
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const auth = getAuth();
 signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert('Logged in Successfully');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
})

//google login

const google = document.getElementById('google');
google.addEventListener('click', (event)=>{
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})