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
getDoc,
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
        console.log(res.user)
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
export async function signInWithGoogle() {
    const result = await signInWithPopup(auth, new GoogleAuthProvider())
    const docSnapshot = await getDoc(doc(db, "users", result.user.uid))
    if (!docSnapshot.exists()) {
        await setDoc(doc(db, "users", result.user.uid), {id: result.user.uid})
    }
}

//Sign Out
export function mySignOut() {
    signOut(auth);
}

// * Database Functions
//Access to users
const usersRef = collection(db, "users");

//Get User Data
export async function getUserData(callback, id) {
    const docRef = doc(db, "users", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    callback(docSnap.data())
}

export async function setUserData(uid, name, username) {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
        name: name,
        username: username,
    }, { merge: true })
}

//Read Users
export async function getUsers(callback) {
    const data = await getDocs(usersRef);
    const users = data.docs.map(doc => {
        return {...doc.data(), id: doc.id};
    })
    callback(users)
}

//Write Documnet

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
