import { NextApiRequest } from "next";
import { CarAccessoryModel, UpdateCarAccessoryModel } from "./models";

// API Request Interface for Create Email User API
export interface CreateEmailAuthNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

// API Request Interface for Sign Email User API
export interface SignInEmailAuthNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

// API Request for Create Accessory API
export interface CreateAccessoryNextApiRequest extends NextApiRequest {
  body: CarAccessoryModel;
}

// API Response for Create Accessory API
export interface CreateAccessoryResponse {
  message: string;
}

// API Request for Create Accessory API
export interface UpdateAccessoryNextApiRequest extends NextApiRequest {
  body: UpdateCarAccessoryModel;
}

// API Response for Create Accessory API
export interface UpdateAccessoryResponse {
  message: string;
}

// API Response for Get All Accessories API
export interface GetAllCarAccessories {
  message?: string;
  accessories?: CarAccessoryModel[];
}

// API Response for Get One Accessories API
export interface GetOneCarAccessories {
  message?: string;
  accessory?: CarAccessoryModel;
}
