import { initializeApp } from 'firebase/app';
import {
    setPersistence,
    browserSessionPersistence,
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from 'firebase/auth';

import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAGQdrzA3rWgTIZEwliPrPPM1FZsv1GoV4",
    authDomain: "imageshopbackend.firebaseapp.com",
    projectId: "imageshopbackend",
    storageBucket: "imageshopbackend.appspot.com",
    messagingSenderId: "770236008430",
    appId: "1:770236008430:web:da6d7494871993b278b0ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        return err;
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        await setPersistence(auth, browserSessionPersistence);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: 'session',
            email,
        });
    } catch (err) {
        return err;
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link sent!');
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};
