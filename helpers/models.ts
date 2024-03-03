export interface CarAccessoryModel {
  id: string;
  price: number;
  title: string;
  photos: string[];
  quantity: string;
  outerType: string;
  innerType: string;
  available: boolean;
  description: string;
}

export interface UpdateCarAccessoryModel {
  id: string;
  price: number;
  title: string;
  photos: string[];
  quantity: string;
  outerType: string;
  innerType: string;
  available: boolean;
  description: string;
  photosToAdd: string[];
  photosToRemove: string[];
}
