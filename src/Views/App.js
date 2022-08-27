import SignIn from "./SignIn";
import { auth } from '../Firebase/FirebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import MainApp from "./MainApp";

export default function App() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      {user ? <MainApp /> : <SignIn />}
    </>
  );
}
