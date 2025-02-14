export interface User {
  id: number;
  email: string;
  password: string;
  role: string;
}

export interface Types {
  id: number;
  name: string;
}

export interface Devices {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
}
