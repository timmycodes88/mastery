import tw from 'twin.macro';
import { mySignOut } from "../Firebase/FirebaseConfig";

export default function MainApp() {
    return(
        <>
            <Header>
                <SignOut onClick={mySignOut}>Signed Out</SignOut>
                <PageBase>
                    
                </PageBase>
            </Header>
        </>
    )
}

const Header = tw.div`w-full sticky bg-green-500`;
const SignOut = tw.button`p-4 m-2 rounded-md text-white bg-red-600`;
const PageBase = tw.div``
