import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  let userRef = firestore.doc(`users/${userAuth.uid}`);

  let snapShot = await userRef.get();

  if (!snapShot.exists) {
    let { displayName, email } = userAuth;
    let createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  let collectionRef = firestore.collection(collectionKey);

  let batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    let newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    let { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
