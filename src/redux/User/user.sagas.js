import userTypes from "./user.types";
import { takeLatest, call, all, put } from "redux-saga/effects";
import { signInSuccess, signOutUserSuccess, resetPasswordSuccess, userError } from "./user.actions";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { handleUserProfile, getCurrentUser, auth } from './../../firebase/utils';
import { handleResetPasswordAPI } from "./user.helpers";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firestore } from "./../../firebase/utils";
import { v4 } from "uuid";

export function* getSnapshotFromUserAuth(user, addtionalData={}){
    try{
        const userRef = yield call(handleUserProfile, { userAuth: user, addtionalData });
        const snapshot = yield userRef.get();
        yield put(
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        );
    } catch(err){
        console.log(err);
    }
}

export function* signUpUser({ payload: { firstName, lastName, email, password, confirmPassword }}) {
    if(password !== confirmPassword){
        const err = ['Password Don\'t match!']
        yield put(
            userError(err)
        )
        return;
    }
    try{
        const { user } = yield createUserWithEmailAndPassword(getAuth(), email, password);
        const addtionalData = {firstName, lastName};
        yield getSnapshotFromUserAuth(user, addtionalData);
        
    } catch(error){
        // const errorCode = error.code;
        const errorMessage = (error.code === 'auth/email-already-in-use') ? 'Email already in use.'
                            : error.message;
        const err = [error.code]
        yield put(
            userError(err)
        )
        // dispatch({
        //     type: userTypes.SIGN_UP_ERROR,
        //     payload: err
        // });
        return;
    }
}

export function* onSignUpUserStart(){
    yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* newsletterSignUp({ payload: {email}}) {
    if(!email){
        return;
    }
    // const documentID = v4();     
    const emailRef = firestore.doc(`newsletterEmail/${email}`);
    const snapshot = emailRef.get();
    
    // create a new document if not in the database
    if(!snapshot.exists){    
        try{
            emailRef.set({
                email
            });
        } catch(error){
            console.log(error);
        }
    }
};

export function* onNewsletterSignUpStart(){
    yield takeLatest(userTypes.NEWSLETTER_SIGN_UP_START, newsletterSignUp);
}


export function* clearUserError(){
    userError([]);
}

export function* emailSignIn({ payload: { email, password } }){
    try{
        const { user } = yield signInWithEmailAndPassword(getAuth(), email, password);
        yield getSnapshotFromUserAuth(user);
    } catch(error){
        // const errorCode = error.code;
        const errorMessage = (error.code === 'auth/wrong-password') ? 'Incorrect Password.' 
                            : (error.code === 'auth/user-not-found') ? 'No account found with that email.'
                            : (error.code === 'auth/too-many-requests') ? 'Too many Requests.' 
                            : error.message;
        const err = [errorMessage];
        yield put(
            userError(err)
        )
        return;
    }    
}

export function* onEmailSignInStart(){
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn)
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth){
            return;
        }
        yield getSnapshotFromUserAuth(userAuth);
    }
    catch(err){
        console.log(err);
    }
}

export function* onCheckUserSession(){
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser(){
    try{
        yield auth.signOut()
        yield put(
            signOutUserSuccess()
        )
    }catch(err){
        console.log(err);
    }
}

export function* onSignOutUserStart(){
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}



export function* resetPassword({ payload: { email }}){
    try{
        yield call(handleResetPasswordAPI, email);
        yield put(
            resetPasswordSuccess()
        )
    } catch(err){
        yield put(
            userError(err)
        )
    }
}

export function* onResetPasswordStart(){
    yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}


const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt: 'select_account'});

export function* googleSignIn(){
    try{
        const { user } = yield signInWithPopup(getAuth(), GoogleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch(err){
        
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}




export default function* userSagas(){
    yield all([
        call(onEmailSignInStart), 
        call(onCheckUserSession), 
        call(onSignOutUserStart),
        call(onSignUpUserStart),
        call(onResetPasswordStart),
        call(onGoogleSignInStart),
        call(onNewsletterSignUpStart)
    ])
}

