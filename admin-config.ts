import * as firebaseAdmin from "firebase-admin";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
      privateKey: process.env.NEXT_FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.NEXT_FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE,
  });
}

export { firebaseAdmin };
