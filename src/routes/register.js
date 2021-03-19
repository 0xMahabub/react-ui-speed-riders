import Home from '../pages/Home';
import Notfound from '../pages/404';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Ride from '../pages/Ride';

export const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
        private: {
            mode: false,
            require: ''
        }
    },
    {
        path: '/login',
        component: Login,
        exact: false,
        private: {
            mode: false,
            require: ''
        }
    },
    {
        path: '/register',
        component: Register,
        exact: false,
        private: {
            mode: false,
            require: ''
        }
    },
    {
        path: '/ride/:rideType',
        component: Ride,
        exact: false,
        private: {
            mode: true,
            require: 'auth'
        }
    },
    {
        path: '/*',
        component: Notfound,
        exact: false,
        private: {
            mode: false,
            require: ''
        }
    }
]; 