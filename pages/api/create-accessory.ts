import {
  CreateAccessoryResponse,
  CreateAccessoryNextApiRequest,
} from "@/helpers/next-api-interfaces";
import { NextApiResponse } from "next";
import { FirebaseError } from "firebase/app";
import { messages } from "@/helpers/response-messages";
import { getDownloadURL } from "firebase-admin/storage";
import {
  getStorageFileRef,
  setDocumentServer,
  setFileInFirebaseStorageServer,
} from "@/helpers/firebase-server-util";
import { getBase64Data, getBase64MimeType } from "@/helpers/db-util";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(
  req: CreateAccessoryNextApiRequest,
  res: NextApiResponse<CreateAccessoryResponse>
) {
  if (req.method === "POST") {
    const {
      id,
      title,
      price,
      quantity,
      available,
      description,
      outerType,
      innerType,
      photos,
    } = req.body;

    // Check that all data is valid
    if (
      !id ||
      !title ||
      !price ||
      available === null ||
      available === undefined ||
      !quantity ||
      !outerType ||
      !innerType ||
      !description ||
      !photos
    ) {
      return res
        .status(422)
        .json({ message: "req.body contains undefined values" });
    }

    // Array that will hold firebase storage urls
    let urlOfPhotos: string[] = [];

    // Array of promises that will resolve them
    const fileNamePromises: Promise<string>[] = [];

    for (let i = 0; i < photos.length; i++) {
      // Get mem type of an image
      const contentType = getBase64MimeType(photos[i]);

      // Get base64 of an image
      const photoData = getBase64Data(photos[i]);

      // Create raw data from an image
      const fileBuffer = Buffer.from(photoData, "base64");

      // Create filename for an image
      const fileName = `${
        process.env.FIREBASE_STORAGE_NAME_ACCESSORIES
      }/${id}/photo-${id}-${i + 1}.${contentType.split("/")[1]}`;

      // Store file in firebase storage
      const imageResponse = await setFileInFirebaseStorageServer(
        fileName,
        fileBuffer,
        contentType,
        `${id}-${i + 1}`
      ).catch(() => {
        // Indicator that uploading failed
        return true;
      });

      // Check if uploading images failed
      if (typeof imageResponse === "boolean")
        return res.status(400).json({ message: messages.failDefaultMessageRu });

      // Get the ref at the firebase storage
      const fileRef = getStorageFileRef(fileName);

      // Store promise in the array to get url eventually
      fileNamePromises.push(getDownloadURL(fileRef));
    }

    try {
      // Get urls of images
      urlOfPhotos = await Promise.all(fileNamePromises);
    } catch (e) {
      if (e instanceof FirebaseError || e instanceof Error)
        return res.status(400).json({ message: e.message });
      else
        return res.status(400).json({ message: messages.failDefaultMessageRu });
    }

    // Parse Id
    const parsedId = id.trim().toUpperCase();

    try {
      // Store document in the real time database
      const dbName = process.env.FIREBASE_DATABASE_NAME_ACCESSORIES ?? "";
      await setDocumentServer(dbName, parsedId, {
        available,
        id: parsedId,
        title: title.trim(),
        price: price.toFixed(2),
        quantity: quantity.trim(),
        innerType: innerType.trim(),
        outerType: outerType.trim(),
        description: description.trim(),
        photos: Object.assign({}, urlOfPhotos),
      });
    } catch (e) {
      if (e instanceof FirebaseError || e instanceof Error)
        return res.status(400).json({ message: e.message });
      else
        return res.status(400).json({ message: messages.failDefaultMessageRu });
    }

    return res.status(200).json({ message: "Accessory was created!" });
  }

  return res.status(422).json({ message: messages.failDefaultMessageRu });
}
