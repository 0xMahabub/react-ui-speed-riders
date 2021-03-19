import { auth, googleAuthProvider } from '../../config/firebase';


// google
export const googleSignIn = async () => {
    let user;
    await auth.signInWithPopup(googleAuthProvider)
    .then(response => user = response.user)
    .catch(err => console.error("Error : ", err))

    return user;
}


// email&password
export const emailPasswordSignIn = async ({ email, password }) => {
    let user = {};
    await auth.signInWithEmailAndPassword(email, password)
    .then(response => user = {...response.user})
    .catch(err => {
        console.error("Error : ", err);
        user.error = err
    })

    return user;
}



// logout
export const signOutUser = async () => {
    let status;
    await auth.signOut()
    .then(() => status = true)
    .catch(err => console.error("Error: ", err))

    return status;
} 