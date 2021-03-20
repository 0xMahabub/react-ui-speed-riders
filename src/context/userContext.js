import {
    useState,
    useContext,
    createContext
} from 'react';

const userContext = createContext(); // user-context


/*--- userContextData : user context data for share ---*/
const ContextData  = () => {
    const [user, setUser] = useState({
        isAuth: false,
        name: '',
        email: ''
    }); // user state



    /*=== Actions ===*/

    // user login
    const loginUser = (usr) => {
        setUser({
            ...user,
            name: usr.name,
            email: usr.email,
            isAuth: true
        });
    }

    // user logout
    const logoutUser = () => {
        setUser({
            ...user,
            name: '',
            email: '',
            isAuth: false
        })
    }


    // return
    return {
        user,
        loginUser,
        logoutUser
    }

}




/*--- user context provider ---*/
export function UserContextProvider({ children }) {
    const userctx = ContextData();

    return (
        <userContext.Provider value={userctx}>
            { children }
        </userContext.Provider>
    )
}


/*--- user context using Hook ---*/
export function useUserContext() {
    return useContext(userContext);
}