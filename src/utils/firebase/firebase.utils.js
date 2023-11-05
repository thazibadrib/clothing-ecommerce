import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider, //this is a class
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGiGjJjzuknG5RyvcS0fpneiJxfi2GDu8",
  authDomain: "clothing-db-1713d.firebaseapp.com",
  projectId: "clothing-db-1713d",
  storageBucket: "clothing-db-1713d.appspot.com",
  messagingSenderId: "394012790319",
  appId: "1:394012790319:web:ffe1cbcbc404cfb31380da",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); //initialize an instace of GoogleAuthProvider class
//setCustomParameters take an configuration object that tells the provider how to behave.
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) =>{
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if(!userSnapShot.exists()){
  const {displayName, email} = userAuth;
  const createdAt = new Date();

  try {
    await setDoc(userDocRef, {
      displayName, email, createdAt
    })
    
  } catch (error) {
    console.log("error creating the user", error.message);
  }
}

return userDocRef;

}

