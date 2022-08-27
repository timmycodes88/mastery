import { mySignOut } from "./Firebase/FirebaseConfig"

export default function MainApp() {
    return(
        <button onClick={mySignOut}>Signed Out</button>
    )
}
