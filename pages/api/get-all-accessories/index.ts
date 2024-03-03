import { FirebaseError } from "firebase/app";
import { CarAccessoryModel } from "@/helpers/models";
import { NextApiRequest, NextApiResponse } from "next";
import { messages } from "@/helpers/response-messages";
import { getAllDocsFromDB } from "@/helpers/firebase-server-util";
import { GetAllCarAccessories } from "@/helpers/next-api-interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetAllCarAccessories>
) {
  if (req.method === "GET") {
    const dbName = process.env.FIREBASE_DATABASE_NAME_ACCESSORIES ?? "";
    let accessories: CarAccessoryModel[] = [];

    try {
      accessories = await getAllDocsFromDB(dbName);
    } catch (e) {
      if (e instanceof FirebaseError || e instanceof Error)
        return res.status(400).json({ message: e.message });
      else
        return res.status(400).json({ message: messages.failDefaultMessageRu });
    }

    return res.status(200).json({ accessories: accessories });
  }

  return res.status(422).json({ message: messages.failDefaultMessageRu });
}
