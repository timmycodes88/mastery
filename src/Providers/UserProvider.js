import { useReducer } from "react"
import { UserContext } from "../Context/UserContext"
import { userReducer } from "../Reducers/userReducer"

const initialUser = {
    user: {},
    loading: false
}

export default function UserProvider({ children }) {

    const [state, dispatch] = useReducer(userReducer, initialUser);

    return(
        <UserContext.Provider value={{...state, dispatch}} >
            {children}
        </UserContext.Provider>
    )
}
