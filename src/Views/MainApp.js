import tw from 'twin.macro';
import { mySignOut, setUserData, getUserData, auth } from "../Firebase/FirebaseConfig";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

export default function MainApp() {

    const [userAuth, loading, error] = useAuthState(auth);


    const [edit, setEdit] = useState(false);

    const [user, setUser] = useState({})

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')

    useEffect(() => {
        getUserData(setUser, userAuth.uid)
    }, [edit])

    function saveButton() {
        setUserData(userAuth.uid, name, username);
        setEdit(false)
    }

    return(
        <>
            <Header>
                <SignOut onClick={mySignOut}>Signed Out</SignOut>
            </Header>
            <PageBase>
                <ProfileWrap>
                    {edit ? 
                        <>
                        <Input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}></Input>
                        <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></Input>
                        <EditButton onClick={saveButton}>Save</EditButton>
                        </>
                        :
                        <>
                        <h1>{user.name ? user.name : "*****"}</h1>
                        <h2>{user.username ? user.username : "*****"}</h2>
                        <EditButton onClick={() => setEdit(val => !val)}>Edit Profile</EditButton>
                        </>
                    }
                </ProfileWrap>
            </PageBase>
        </>
    )
}

const Header = tw.div`w-full sticky bg-green-500`;
const SignOut = tw.button`p-4 m-2 rounded-md text-white bg-red-600`;
const PageBase = tw.div`p-4` // ! TEMP STYLES

const ProfileWrap = tw.div`p-4 my-4 m-auto bg-gray-300 text-gray-900 text-center border border-gray-500`
const Input = tw.input`block my-4 mx-auto`
const EditButton = tw.button`bg-white px-2 py-1 rounded-2xl m-auto`
