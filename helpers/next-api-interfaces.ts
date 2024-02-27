import { NextApiRequest } from "next";
import { CarAccessoryModel } from "./models";

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
