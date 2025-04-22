export interface Trip {
    _id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    destination: string[],
    user: string
}