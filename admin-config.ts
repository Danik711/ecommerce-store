import * as firebaseAdmin from "firebase-admin";

const firebaseAdminConfig = {
  credential: firebaseAdmin.credential.cert({
    projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
    privateKey: process.env.NEXT_FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.NEXT_FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE,
};

let admin_app =
  firebaseAdmin.apps.length === 0
    ? firebaseAdmin.initializeApp(firebaseAdminConfig)
    : firebaseAdmin.apps[0]
    ? firebaseAdmin.apps[0]
    : firebaseAdmin.initializeApp(firebaseAdminConfig);

export default admin_app;
