<<<<<<< HEAD
export interface Trip {
    _id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    destination: string[],
    user: string
=======

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
>>>>>>> 42a3f9ab3f8388712e4904f7aff400e42057ebfc
}