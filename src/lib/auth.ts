import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "./firebase";

// Create user with email and password
export async function createUser(email: string, password: string): Promise<UserCredential> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
}

// Sign in with email and password
export async function signIn(email: string, password: string): Promise<UserCredential> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
}

// Sign out current user
export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}

// Get current user
export function getCurrentUser(): User | null {
  return auth.currentUser;
}
