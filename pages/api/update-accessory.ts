import {
  UpdateAccessoryNextApiRequest,
  UpdateAccessoryResponse,
} from "@/helpers/next-api-interfaces";
import { NextApiResponse } from "next";
import { FirebaseError } from "firebase/app";
import {
  getBase64Data,
  getBase64MimeType,
  getFirebaseUrlMimeType,
  getLastImageToken,
} from "@/helpers/db-util";
import { getDownloadURL } from "firebase-admin/storage";
import {
  getStorageFileRef,
  setFileInFirebaseStorageServer,
  deleteFileFromFirebaseStorageServer,
  updateDocumentServer,
} from "@/helpers/firebase-server-util";
import { messages } from "@/helpers/response-messages";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

async function parseNewPhotos(
  photosToAdd: string[],
  largestToken: number,
  docId: string
) {
  // Array that will hold firebase storage urls
  let urlOfPhotos: string[] = [];

  // Array of promises that will resolve them
  const fileNamePromises: Promise<string>[] = [];

  for (let i = 0; i < photosToAdd.length; i++) {
    // Get mem type of an image
    const contentType = getBase64MimeType(photosToAdd[i]);

    // Get base64 of an image
    const photoData = getBase64Data(photosToAdd[i]);

    // Create raw data from an image
    const fileBuffer = Buffer.from(photoData, "base64");

    // Create filename for an image
    const fileName = `${
      process.env.FIREBASE_STORAGE_NAME_ACCESSORIES
    }/${docId}/photo-${docId}-${largestToken + i + 1}.${
      contentType.split("/")[1]
    }`;

    // Store file in firebase storage
    await setFileInFirebaseStorageServer(
      fileName,
      fileBuffer,
      contentType,
      `${docId}-${largestToken + i + 1}`
    );

    // Get the ref at the firebase storage
    const fileRef = getStorageFileRef(fileName);

    // Store promise in the array to get url eventually
    fileNamePromises.push(getDownloadURL(fileRef));
  }

  // Get urls of images
  urlOfPhotos = await Promise.all(fileNamePromises);

  return urlOfPhotos;
}

async function deletePhotos(
  photos: string[],
  photosToRemove: string[],
  id: string
) {
  // Get a copy of array of photos
  let auxPhotos = [...photos];

  for (const photoToDelete of photosToRemove) {
    // Split url to get token of a photo
    const splittedName = photoToDelete.split("-");

    // Get photo format (png, jpg etc)
    const mimeType = getFirebaseUrlMimeType(photoToDelete);

    // Get photo token from split
    const token = splittedName[splittedName.length - 1];

    // Get full token for example CM0001-6
    const fullTokenName = `${id}-${token}`;

    // Photo path in the storage
    const fileName = `${process.env.FIREBASE_STORAGE_NAME_ACCESSORIES}/${id}/photo-${fullTokenName}${mimeType}`;

    // Delete photo
    await deleteFileFromFirebaseStorageServer(fileName);

    // Filter array of photos to remove deleted photo
    auxPhotos = auxPhotos.filter((photo) => {
      if (!photo.includes(fullTokenName)) return photo;
    });
  }

  return auxPhotos;
}

export default async function handler(
  req: UpdateAccessoryNextApiRequest,
  res: NextApiResponse<UpdateAccessoryResponse>
) {
  if (req.method === "POST") {
    const {
      id,
      title,
      price,
      photos,
      quantity,
      available,
      outerType,
      innerType,
      description,
      photosToAdd,
      photosToRemove,
    } = req.body;

    // Check that all data is valid
    if (
      !id ||
      !title ||
      !price ||
      !photos ||
      !quantity ||
      !available ||
      !outerType ||
      !innerType ||
      !description ||
      !photosToAdd ||
      !photosToRemove
    ) {
      return res
        .status(422)
        .json({ message: "req.body contains undefined values" });
    }

    // Varaible will hold url of new photos,
    // if a user added new photos
    let auxPhotosToAdd: string[] = [];

    // Variable that will be used to add/remove photos
    let auxUpdatedPhotos: string[] = [...photos];

    // Varaible will hold last image token number.
    // It is used to incremente numbers to create unique tokens
    const largestToken = getLastImageToken(photos);

    if (photosToAdd.length !== 0) {
      try {
        auxPhotosToAdd = await parseNewPhotos(photosToAdd, largestToken, id);
      } catch (e) {
        if (e instanceof FirebaseError || e instanceof Error)
          return res.status(400).json({ message: e.message });
        else
          return res
            .status(400)
            .json({ message: messages.failDefaultMessageRu });
      }
    }

    if (photosToRemove.length !== 0) {
      try {
        auxUpdatedPhotos = await deletePhotos(photos, photosToRemove, id);
      } catch (e) {
        if (e instanceof FirebaseError || e instanceof Error)
          return res.status(400).json({ message: e.message });
        else
          return res
            .status(400)
            .json({ message: messages.failDefaultMessageRu });
      }
    }

    try {
      const dbName = process.env.FIREBASE_DATABASE_NAME_ACCESSORIES ?? "";
      const filnalPhotos = [...auxPhotosToAdd, ...auxUpdatedPhotos];
      await updateDocumentServer(dbName, id, {
        id,
        available,
        title: title.trim(),
        price: price.toFixed(2),
        quantity: quantity.trim(),
        innerType: innerType.trim(),
        outerType: outerType.trim(),
        description: description.trim(),
        photos: Object.assign({}, filnalPhotos),
      });
    } catch (e) {
      if (e instanceof FirebaseError || e instanceof Error)
        return res.status(400).json({ message: e.message });
      else
        return res.status(400).json({ message: messages.failDefaultMessageRu });
    }

    return res.status(200).json({ message: "Accessory Updated" });
  }
}
