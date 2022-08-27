import tw from 'twin.macro';
import { mySignOut } from "../Firebase/FirebaseConfig";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Routes/Home';
import GlobalChat from './Routes/GlobalChat';

export default function MainApp() {
    return(
        <>
            <Header>
                <SignOut onClick={mySignOut}>Signed Out</SignOut>
            </Header>
            <PageBase>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/globalChat" element={<GlobalChat />} />
                    </Routes>
                </BrowserRouter>
            </PageBase>
        </>
    )
}

const Header = tw.div`w-full sticky bg-green-500`;
const SignOut = tw.button`p-4 m-2 rounded-md text-white bg-red-600`;
const PageBase = tw.div`p-4` // ! TEMP STYLES
