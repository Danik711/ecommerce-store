import { CarAccessoryModel } from "@/helpers/models";
import { NextApiRequest, NextApiResponse } from "next";
import { messages } from "@/helpers/response-messages";
import { isAnCarAccessory } from "@/helpers/type-guards";
import { getDocByIdFromDB } from "@/helpers/firebase-server-util";
import { GetOneCarAccessories } from "@/helpers/next-api-interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetOneCarAccessories>
) {
  if (req.method === "GET") {
    const { id } = req.query;

    if (!id) {
      return res
        .status(422)
        .json({ message: "req.query contains undefined values" });
    }

    const dbName = process.env.FIREBASE_DATABASE_NAME_ACCESSORIES ?? "";
    let data: CarAccessoryModel | {};
    if (typeof id === "string") data = await getDocByIdFromDB(dbName, id);
    else data = await getDocByIdFromDB(dbName, id[0]);

    if (isAnCarAccessory(data))
      return res.status(200).json({ accessory: data });
  }

  return res.status(422).json({ message: messages.failDefaultMessageRu });
}
