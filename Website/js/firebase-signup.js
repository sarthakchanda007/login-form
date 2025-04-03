// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Toggle password visibility
function togglePassword() {
    let passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}

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

// When the signup button is pressed
const submit = document.getElementById('signup-btn');
submit.addEventListener('click', (event) => {
    event.preventDefault();

    // Get input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();

    // Error message elements
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const phoneError = document.getElementById("phone-error");
    const passwordError = document.getElementById("password-error");

    // Reset previous error messages
    nameError.innerText = "";
    emailError.innerText = "";
    phoneError.innerText = "";
    passwordError.innerText = "";

    let isValid = true;

    // Name validation (Only letters and spaces allowed)
    let namePattern = /^[A-Za-z\s]+$/;
    if (name === "") {
        nameError.innerText = "Name is required";
        isValid = false;
    } else if (!namePattern.test(name)) {
        nameError.innerText = "Only letters are allowed";
        isValid = false;
    }

    // Email validation
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "") {
        emailError.innerText = "Email is required";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailError.innerText = "Enter a valid email address";
        isValid = false;
    }

    // Phone number validation (10-digit)
    let phonePattern = /^[0-9]{10}$/;
    if (phone === "") {
        phoneError.innerText = "Phone number is required";
        isValid = false;
    } else if (!phonePattern.test(phone)) {
        phoneError.innerText = "Enter a valid 10-digit phone number";
        isValid = false;
    }

    // Password validation (Minimum 6 characters)
    if (password === "") {
        passwordError.innerText = "Password is required";
        isValid = false;
    } else if (password.length < 6) {
        passwordError.innerText = "Password must be at least 6 characters";
        isValid = false;
    }

    // Stop Firebase authentication if any field is invalid
    if (!isValid) {
        return;
    }

    // Proceed with Firebase authentication if all inputs are valid
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Sign Up Successful');
            document.getElementById("signup-form").reset(); // Reset form fields
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });



});

//google signup

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
    alert(errorMessage);
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})

