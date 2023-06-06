import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore , getDocs,collection, addDoc,where,deleteDoc,updateDoc,doc,query, getCountFromServer } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDN6jtk0IfaYzGEiGRzgDDO3mpFNTHPXVs",
  authDomain: "iptudu.firebaseapp.com",
  projectId: "iptudu",
  storageBucket: "iptudu.appspot.com",
  messagingSenderId: "250632848913",
  appId: "1:250632848913:web:e36b831eb74388ff4453b0",
  measurementId: "G-6P5Q3Y5R0T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth, db, getDocs, collection, addDoc,where, deleteDoc, updateDoc,doc,query,getCountFromServer }