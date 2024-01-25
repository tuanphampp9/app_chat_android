
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const getFirebaseApp = () => {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyCTN6dQDnJTAQL9yrTGHCW4NL6ekRSA6WA",
        authDomain: "app-chat-realtime-1e526.firebaseapp.com",
        projectId: "app-chat-realtime-1e526",
        storageBucket: "app-chat-realtime-1e526.appspot.com",
        messagingSenderId: "980986417818",
        appId: "1:980986417818:web:df5e9515ddd12668bc0523",
        measurementId: "G-VVL3DVBVXC"
    };

    // Initialize Firebase
    return initializeApp(firebaseConfig);
}