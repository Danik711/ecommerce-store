import { CarAccessoryModel } from "./models";

export function isAnCarAccessory(obj: any): obj is CarAccessoryModel {
  return "id" in obj && "price" in obj;
}
