import admin_app from "@/admin-config";
import { getStorage } from "firebase-admin/storage";
import { getDatabase } from "firebase-admin/database";

// Function for getting admin database ref
export function getFirebaseDatabaseServer() {
  return getDatabase(admin_app);
}

// Function for getting admin storage ref
export function getFirebaseBucketServer() {
  return getStorage(admin_app).bucket();
}

// Function sets a document in firebase database
export async function setDocumentServer(
  databaseName: string,
  docName: string,
  document: any
) {
  const dbRef = getFirebaseDatabaseServer();

  // Get the ref to cluster document
  const accessriesRef = dbRef.ref(`${databaseName}/${docName}`);

  await accessriesRef.set(document);
}

// Function that returns ref of a file from firebase storage
export function getStorageFileRef(fileName: string) {
  const bucket = getFirebaseBucketServer();

  return bucket.file(fileName);
}

// Function that sets a file in firebase storage
export async function setFileInFirebaseStorageServer(
  fileName: string,
  fileBuffer: Buffer,
  contentType: string,
  token: string
) {
  const bucket = getFirebaseBucketServer();

  await bucket.file(fileName).save(fileBuffer, {
    metadata: {
      contentType: contentType,
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
    },
  });
}

export async function deleteFileFromFirebaseStorageServer(fileName: string) {
  const bucket = getFirebaseBucketServer();
  await bucket.file(fileName).delete();
}

export async function updateDocumentServer(
  databaseName: string,
  docName: string,
  document: any
) {
  const dbRef = getFirebaseDatabaseServer().ref(`${databaseName}/${docName}`);

  await dbRef.update(document);
}
