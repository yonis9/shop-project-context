import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCyaVhbp577CeD1CIqgs9L64JhV8K5D8Gg",
  authDomain: "crwn-db-b1df9.firebaseapp.com",
  databaseURL: "https://crwn-db-b1df9.firebaseio.com",
  projectId: "crwn-db-b1df9",
  storageBucket: "crwn-db-b1df9.appspot.com",
  messagingSenderId: "747630886993",
  appId: "1:747630886993:web:4180c3b68fcf2006563870"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
