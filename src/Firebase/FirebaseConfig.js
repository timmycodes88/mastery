import { initializeApp } from "firebase/app";
import {
getAuth, 
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
GoogleAuthProvider,
signInWithPopup
} from "firebase/auth";

//Global Variables
export let user;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID, 
  measurementId: process.env.REACT_APP_MEASUREMENT_ID, 
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// * Auth Functions
//Create Account
export function createAnAccount(email, password, rePassword) {
    if (password !== rePassword) {
        console.log('WRONG RE PASSWORD!'); 
        return;
    } 

    createUserWithEmailAndPassword(auth, email, password).then((res) => {
        user = res.user;
    }).catch((err) => {
        console.log('Error Code: ', err.code);
        console.log('Error Msg: ', err.message);
    })

}
//Sign In
export function signInWithEmail(email, password) {
    signInWithEmailAndPassword(auth, email, password).then(res => {
        user = res.user;
    }).catch(err => {
        console.log('Error Code: ', err.code);
        console.log('Error Msg: ', err.message);
    })
}
//now With Google
export function signInWithGoogle() {
    signInWithPopup(auth, new GoogleAuthProvider()).then((res) => {
        console.log(res);
    }).catch(err => {
        console.log('Code: ', err.code, 'Msg: ', err.message);
    });
}

//Sign Out
export function mySignOut() {
    signOut(auth);
}
