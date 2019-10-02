import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDSGscV3FuteD17NlyXChVIZntVzGZ_JgM",
  authDomain: "crwn-db-28f38.firebaseapp.com",
  databaseURL: "https://crwn-db-28f38.firebaseio.com",
  projectId: "crwn-db-28f38",
  storageBucket: "",
  messagingSenderId: "244023221734",
  appId: "1:244023221734:web:861a44293df6dea851ca27",
  measurementId: "G-4Z0RVP34BV"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if(!userAuth) {
    return;
  }

  let userRef = firestore.doc(`users/${userAuth.uid}`);

  let snapShot = await userRef.get();

  if(!snapShot.exists) {
    let { displayName, email } = userAuth;
    let createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch(error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;



