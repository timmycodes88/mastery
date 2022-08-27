import { SET_LOADING, GET_USER } from "../Reducers/userReducer";
import { initializeApp } from "firebase/app";
import {
getAuth, 
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
GoogleAuthProvider,
signInWithPopup
} from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

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

    const { loading, dispatch } = useContext(UserContext);

    dispatch({ type: SET_LOADING });
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
        user = res.user;
        dispatch({ type: GET_USER, payload: user })
    }).catch((err) => {
        throw ('Error Code: ', err.code, 'Error Msg: ', err.message);
    })

    if (loading) return (<h4>LOADINGING.........</h4>)
    return (<></>)
}
//Sign In
export function signInWithEmail(email, password) {
    signInWithEmailAndPassword(auth, email, password).then(res => {
        user = res.user;
    }).catch(err => {
        throw ('Error Code: ', err.code, 'Error Msg: ', err.message);
    })
}
//now With Google
export function signInWithGoogle() {
    signInWithPopup(auth, new GoogleAuthProvider()).then((res) => {
        console.log(res);
    }).catch(err => {
        throw('Code: ', err.code, 'Msg: ', err.message);
    });
}

//Sign Out
export function mySignOut() {
    signOut(auth);
}
