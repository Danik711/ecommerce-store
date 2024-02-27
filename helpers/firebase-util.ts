import firebase_app from "@/config";
import { FirebaseError } from "firebase/app";
import {
  User,
  getAuth,
  signOut,
  deleteUser,
  updateProfile,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { messages } from "./response-messages";
import { getDatabase } from "firebase/database";

// Function gets firebase functions
export function getFirebaseAuth() {
  return getAuth(firebase_app);
}

// Function gets firebase storage
export function getFirebaseStorage() {
  return getStorage(firebase_app);
}

// Function gets firebase storage
export function getFirebaseDatabase() {
  return getDatabase(firebase_app);
}

// Function updates firebase user profile
export async function updateFirebaseProfile(user: User, displayName: string) {
  let result = false;
  let message = "";
  try {
    await updateProfile(user, {
      displayName,
    });
    result = true;
    message = messages.displayNameUpdated;
  } catch (e) {
    if (e instanceof FirebaseError || e instanceof Error) message = e.message;
    else message = messages.failDefaultMessageRu;
  }

  return { result, message };
}

// Function creates email/password authentication
export async function emailSignUp(
  email: string,
  password: string,
  displayName: string
) {
  // Get firebase functions
  const auth = getFirebaseAuth();
  let error: string = "";
  let response: UserCredential | null = null;

  try {
    // Create user
    response = await createUserWithEmailAndPassword(auth, email, password);
    await updateFirebaseProfile(response.user, displayName);
  } catch (e) {
    if (e instanceof FirebaseError || e instanceof Error) error = e.message;
    else error = messages.failDefaultMessageRu;
  }

  return { response, error };
}

// Function that signs a user out
export async function userSignOut() {
  const auth = getFirebaseAuth();
  let message = "";
  let didError = false;
  try {
    await signOut(auth);
    message = messages.signOutSuccess;
  } catch (e) {
    message = messages.failDefaultMessageRu;
    didError = true;
  }

  return { didError, message };
}

// Function that signs a user in
export async function emailSignIn(email: string, password: string) {
  const auth = getFirebaseAuth();
  let error: string = "";
  let response: UserCredential | null = null;

  try {
    response = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    if (e instanceof FirebaseError || e instanceof Error) error = e.message;
    else error = messages.failDefaultMessageRu;
  }

  return { response, error };
}

export async function userDelete() {
  let didError = false;
  let message: string = "";

  const auth = getFirebaseAuth();

  try {
    if (auth.currentUser) {
      await deleteUser(auth.currentUser);
      message = messages.deleteSuccess;
    } else {
      throw new Error(messages.failDefaultMessageRu);
    }
  } catch (e) {
    if (e instanceof FirebaseError || e instanceof Error) message = e.message;
    else message = messages.failDefaultMessageRu;

    didError = true;
  }

  return { message, didError };
}
