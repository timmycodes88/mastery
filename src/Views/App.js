import SignIn from "./SignIn";
<<<<<<< HEAD:src/Views/App.js
import { auth } from '../Firebase/FirebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import MainApp from "./MainApp";

export default function App() {
  const [user, loading, error] = useAuthState(auth);
=======

export default function App() {
>>>>>>> parent of bd16814 (Sign in Setup!):src/App.js
  return (
    <>
      <SignIn />
    </>
  );
}
