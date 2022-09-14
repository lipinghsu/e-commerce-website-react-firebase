import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { firebaseConfig } from './config';
import {  getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { initializeApp } from "firebase/app";

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const auth = getAuth();
export const firestore = firebase.firestore();

export const handleUserProfile = async({ userAuth, addtionalData }) =>{
    if(!userAuth){
        return;
    }
    const { uid } = userAuth;
    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();
    
    // create a new document if the user is not in the database
    if(!snapshot.exists){
        const { firstName, lastName, email } = userAuth;
        const timestamp = new Date();
        const userRoles = ['user'];

        try{
            await userRef.set({
                firstName,
                lastName,
                email,
                createdDate: timestamp,
                userRoles,
                ...addtionalData
            });
        } catch(err){

        }
    }
    // return userRef to update the local state of the App.
    return userRef;
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    })
}

