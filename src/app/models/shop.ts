export class Shop {
  id: string;
  name: string;
  email: string;
  city: string;
  picture: string;
  location: {type: string, coordinates: number[]};
}
