import {
  CreateAccessoryNextApiRequest,
  CreateAccessoryResponse,
} from "@/helpers/next-api-interfaces";
import { NextApiResponse } from "next";
import { FirebaseError } from "firebase/app";
import { getDatabase } from "firebase-admin/database";
import { messages } from "@/helpers/response-messages";
import { getDownloadURL, getStorage } from "firebase-admin/storage";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

// Function that gets mime type of an image
function getBase64MimeType(encoded: string) {
  let result: string = "";
  if (typeof encoded !== "string") {
    return result;
  }
  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  if (mime && mime.length) {
    result = mime[1];
  }
  return result;
}

// Function that get base64 from an image
function getBase64Data(encoded: string) {
  const base64EncodedString = encoded.replace(/^data:\w+\/\w+;base64,/, "");
  return base64EncodedString;
}

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

    // Ref to the firebase storage of a project
    const bucket = getStorage().bucket();

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
      const fileName = `CarAccessories/${id}/photo-${id}-${i + 1}.${
        contentType.split("/")[1]
      }`;

      // Store file in firebase storage
      await bucket.file(fileName).save(fileBuffer, {
        metadata: {
          contentType: contentType,
          metadata: {
            firebaseStorageDownloadTokens: `${id}-${i + 1}`,
          },
        },
      });

      // Get the ref at the firebase storage
      const fileRef = bucket.file(fileName);

      // Store promise in the array to get url eventually
      fileNamePromises.push(getDownloadURL(fileRef));
    }

    // Get urls of images
    urlOfPhotos = await Promise.all(fileNamePromises);

    // Get ref to real time database
    const firebaseDbRef = getDatabase();
    // Get the ref to cluster document
    const accessriesRef = firebaseDbRef.ref("car-accessories");

    // Parse Id
    const parsedId = id.trim().toUpperCase();

    try {
      // Store document in the real time database
      await accessriesRef.set({
        [parsedId]: {
          available,
          id: parsedId,
          title: title.trim(),
          price: price.toFixed(2),
          quantity: quantity.trim(),
          innerType: innerType.trim(),
          outerType: outerType.trim(),
          description: description.trim(),
          photos: Object.assign({}, urlOfPhotos),
        },
      });
    } catch (e) {
      if (e instanceof FirebaseError || e instanceof Error)
        return res.status(400).json({ message: e.message });
      else
        return res.status(400).json({ message: messages.failDefaultMessageRu });
    }

    res.status(200).json({ message: "Accessory was created!" });
  }

  return res.status(422).json({ message: messages.failDefaultMessageRu });
}
