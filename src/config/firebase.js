import firebase from 'firebase';
import { firebaseConfig } from './firebase.config';
// import auth from 'firebase/auth';

const firebaseApp = firebase.initializeApp(firebaseConfig);

// if (firebase.apps.length === 0) {
//     firebaseApp = firebase.initializeApp(firebaseConfig);
// }

const auth = firebaseApp.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    auth,
    googleAuthProvider
}