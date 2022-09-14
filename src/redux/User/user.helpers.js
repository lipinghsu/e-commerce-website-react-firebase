import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const handleResetPasswordAPI = (email) => {
    const config = {
        //url of the page that we send ot the user 
        url:'http://localhost:3000/login'
    }

    return new Promise((resolve, reject) => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email, config)
        .then(() => {
            resolve();
            // redirect to a new page -> verify user is not a robot here
        })
        .catch((err) => {
            const error = ['No account found with that email. Please try again.'];
            reject(error);
        });

    });
}