import { auth } from '../../config/firebase';


// email&Password
export const emailPasswordsignUp = async ({ email, password }) => {
    let user = {};
    await auth.createUserWithEmailAndPassword(email, password)
    .then(newUser => user = {...newUser})
    .catch(err => {
        console.error("Error: ", err)
        user.error = err
    })

    return user;
}
