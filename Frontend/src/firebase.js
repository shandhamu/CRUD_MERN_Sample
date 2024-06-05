import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTkFCCLs2PddvM49G4HtpoT8rQ-GGDB_s",
  authDomain: "login-428d6.firebaseapp.com",
  projectId: "login-428d6",
  storageBucket: "login-428d6.appspot.com",
  messagingSenderId: "885316080917",
  appId: "1:885316080917:web:f8e2858fcbbcbfc8da051c",
  measurementId: "G-CYGH02SKZV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export default firebaseApp;
