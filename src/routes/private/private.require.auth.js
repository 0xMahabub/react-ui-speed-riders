import {
    Redirect, Route
} from 'react-router-dom';
import { useUserContext } from '../../context/userContext';

export function PrivateRouteRequireAuth({ location, ...rest }) {

    let userStatus = useUserContext(); // using user-context

    return (
        <>
            {
                userStatus.user.isAuth === true ? (<Route {...rest} />) : (
                    <Redirect 
                        to={{
                            pathname: '/login',
                            state: {
                                from: location,
                                message: 'You must login first!'
                            }
                        }}
                    />
                )
            }
        </>
    )
}