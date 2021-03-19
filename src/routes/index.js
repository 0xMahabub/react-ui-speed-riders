import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { routes } from './register';
import { PrivateRouteRequireAuth } from './private/private.require.auth';



export default function MainRouters () {
    return (
        <Router>
            <Switch>
                {
                    routes.map(rt => (
                        rt.private.mode === true ? (
                            rt.private.require === 'auth' ?
                            (
                                <PrivateRouteRequireAuth
                                    key={rt.path}
                                    path={rt.path}
                                    exact={rt.exact}
                                    component={rt.component}
                                    // dependency={userStatus}
                                />
                            ) : null
                        ) : (
                            <Route
                                key={rt.path}
                                exact={rt.exact}
                                path={rt.path}
                                component={rt.component}
                            />
                        )
                    ))
                }
            </Switch>
        </Router>
    )
}