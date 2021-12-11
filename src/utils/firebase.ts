import { initializeApp } from 'firebase/app';
import { collection, CollectionReference, doc, DocumentReference, getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { StoredConfiguration } from '../models/Configuration';

// Initialize Firebase
initializeApp({
  apiKey: 'AIzaSyCN2yuROuU9dXMnd2-ffACWtioVRqmgmlw',
  authDomain: 'pv247-game-of-life.firebaseapp.com',
  projectId: 'pv247-game-of-life',
  storageBucket: 'pv247-game-of-life.appspot.com',
  messagingSenderId: '696496172470',
  appId: '1:696496172470:web:02d72aa4ed479047d9e517',
});

// Authentication
const provider = new GoogleAuthProvider();
const auth = getAuth();

// Sign in handler
export const logIn = () => signInWithPopup(auth, provider);

// Sign out handler
export const logOut = () => signOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) => onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();

// Collections
export const sharedConfigurationsCollection = collection(
  db,
  'configurations',
) as CollectionReference<StoredConfiguration>;

export const configurationDocument = (id: string) =>
  doc(db, 'configurations', id) as DocumentReference<StoredConfiguration>;

export const usersConfigurationsCollection = (id: string) =>
  collection(db, `users/${id}/configurations`) as CollectionReference<StoredConfiguration>;

export const usersConfigurationDocument = (userId: string, configId: string) =>
  doc(db, `users/${userId}/configurations`, configId) as DocumentReference<StoredConfiguration>;
