import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  type Auth,
} from "firebase/auth";

let app: FirebaseApp | undefined;
let authInstance: Auth | undefined;

function getFirebaseConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_authDomain,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_measurementId,
  };
}

/** Lazy init — safe for SSR/build (returns null on server). */
export function getClientAuth(): Auth | null {
  if (typeof window === "undefined") return null;
  const config = getFirebaseConfig();
  if (!config.apiKey) return null;

  if (!authInstance) {
    app = getApps().length ? getApps()[0]! : initializeApp(config);
    authInstance = getAuth(app);
  }
  return authInstance;
}

export const signIn = async (email: string, password: string) => {
  const a = getClientAuth();
  if (!a) throw new Error("Firebase Auth is not available");
  await signInWithEmailAndPassword(a, email, password);
};

export const userSignOut = async () => {
  const a = getClientAuth();
  if (!a) return;
  await signOut(a);
};
