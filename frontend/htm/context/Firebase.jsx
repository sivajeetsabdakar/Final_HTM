"use client";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "./firebaseConfig";
import { createContext, useContext } from "react";

const auth = getAuth(app);
const googleAuth = new GoogleAuthProvider();
export const FirebaseContext = createContext();

let signinWithGoogle = () => {
  return signInWithPopup(auth, googleAuth);
};
let logOut = () => {
  signOut(auth);
};
export function FirebaseProvider({ children }) {
  return (
    <FirebaseContext.Provider value={{ signinWithGoogle, logOut }}>
      {children}
    </FirebaseContext.Provider>
  );
}
export const useFirebase = () => {
  return useContext(FirebaseContext);
};
