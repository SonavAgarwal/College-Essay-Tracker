import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
