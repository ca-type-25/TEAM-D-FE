export interface Trip {
    _id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    destination: string[],
    user: string
}

export interface Activity {
  _id: string
  name: string
  price: number
  description: string
  destinationIds: Destination[]
}

export interface Destination {
  _id: string
  name: string
  country: string
  geolocation: {
    longitude: number
    latitude: number
  }
  description: string
}

export interface Category {
  _id: string,
  name: string
}

export type User = {
  name: string
  surname: string
  age: number
  nationality: string
  email: string
}