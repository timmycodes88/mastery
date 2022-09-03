import { initializeApp } from "firebase/app";
import {
getAuth, 
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
GoogleAuthProvider,
signInWithPopup
} from "firebase/auth";
import {
getFirestore,
collection,
doc,
addDoc,
getDocs,
setDoc,
deleteDoc,
} from "firebase/firestore";



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
export const db = getFirestore(app);

// * Auth Functions
//Create Account
export function createAnAccount(email, password, rePassword) {
    if (password !== rePassword) {
        console.log('WRONG RE PASSWORD!'); 
        return;
    } 

    createUserWithEmailAndPassword(auth, email, password).then((res) => {
    }).catch((err) => {
        console.log('Error Code: ', err.code);
        console.log('Error Msg: ', err.message);
    })

}
//Sign In
export function signInWithEmail(email, password) {
    signInWithEmailAndPassword(auth, email, password).then(res => {
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

// * Database Functions

//Access to users
const usersRef = collection(db, "users");

//Read Users
export async function getUsers(callback) {
    const data = await getDocs(usersRef);
    const users = data.docs.map(doc => {
        return {...doc.data(), id: doc.id};
    })
    callback(users)
}

//Write Documnet
export async function setDocUsername(username) {
    await addDoc(usersRef, {
        username: username,
    })
}

//Update a Document
export async function updateFirstName(name, id) {
    const docRef = await doc(db, "users", id)
    await setDoc(docRef, { firstName: name }, { merge: true })
}

//Delete Document
export async function deleteUser(id) {
    const docRef = await doc(db, "users", id)
    await deleteDoc(docRef)
}
