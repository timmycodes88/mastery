import tw from 'twin.macro';
import { mySignOut, getUsers, setDocUsername, updateFirstName, deleteUser } from "../Firebase/FirebaseConfig";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Routes/Home';
import GlobalChat from './Routes/GlobalChat';
import { useEffect, useState } from 'react';

export default function MainApp() {

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [newName, setNewName] = useState("");

    useEffect(() => {
        getUsers(setUsers);
    })

    function createNewUser() {
        setDocUsername(username);
        setUsername('')
    }

    function changeFirstName(id) {
        updateFirstName(newName, id)
        setNewName("");
    }

    return(
        <>
            <Header>
                <SignOut onClick={mySignOut}>Signed Out</SignOut>
            </Header>
            <PageBase>
                {users.map(user => {
                    return (
                        <>
                            <h2>{user.firstName} {user.lastName}</h2>
                            <input className='border border-blue-500' value={newName} onChange={(e) => setNewName(e.target.value)}></input>
                            <button onClick={() => changeFirstName(user.id)} >Change First Name</button>
                            <button className='text-4xl' onClick={() => deleteUser(user.id)} >X</button>
                        </>
                    )
                })}
                <input className='border border-blue-500' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <button onClick={createNewUser} >Set Username</button>
                
            </PageBase>
        </>
    )
}

const Header = tw.div`w-full sticky bg-green-500`;
const SignOut = tw.button`p-4 m-2 rounded-md text-white bg-red-600`;
const PageBase = tw.div`p-4` // ! TEMP STYLES
