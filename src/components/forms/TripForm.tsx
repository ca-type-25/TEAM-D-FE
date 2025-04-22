import { useEffect, useState } from "react"
import { API_URL } from "../../utils/config"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Trip } from "../../types/TypesExport"

type TripFormProps = {
    editTripData?: Trip
}

const TripsForm: React.FC<TripFormProps> = ( {editTripData} ) => {
    const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState<string>('')

    const [destinations, setDestinations] = useState([])
    const [selectedDestinations, setSelectedDestinations] = useState([])

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<number>(0)

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(`${API_URL}/categories`)
            const data = await res.json()
            setCategories(data)
        }
        const fetchDestinations = async () => {
            const res = await fetch(`${API_URL}/destinations`)
            const data = await res.json()
            setDestinations(data)
        }
        fetchDestinations()
        fetchCategories()
    }, [])

    const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)}
    const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {setDescription(event.target.value)}
    const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {setPrice(event.target.value)}
    const categoryHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {setSelectedCategory(event.target.value)}
    const destinationHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target
        if (checked) {
            setSelectedDestinations((prevState) => [...prevState, value])
        } else {
            setSelectedDestinations((prevState) => prevState.filter((language) => language !== value))
        }
    }

    useEffect(() => {
        if (editTripData) {
            setName(editTripData.name)
            setDescription(editTripData.description)
            setPrice(editTripData.price)
            setSelectedCategory(editTripData.category?._id || editTripData.category)
            setSelectedDestinations(editTripData.destination.map(destination => destination._id || destination))
        }
    }, [editTripData])


    const formHandler = (event: React.FormEvent) => {
        event.preventDefault()

        const newTrip = {
            name,
            description,
            price,
            category: selectedCategory,
            destination: selectedDestinations
        }

        if (editTripData) {
            axios.put(`${API_URL}/trips/${editTripData._id}`, newTrip)
            navigate(`/trips`)
        } else {
            axios.post(`${API_URL}/trips`, newTrip)
            navigate(`/trips`)
        }
    }

    return (
        <>
            <form onSubmit={formHandler}>
                <div className="formControl">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" value={name} onChange={nameHandler} />
                </div>
                <div className="formControl">
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" id="description" value={description} onChange={descriptionHandler} />
                </div>
                <div className="formControl">
                    <label htmlFor="price">Price:</label>
                    <input type="number" name="price" id="price" value={price} onChange={priceHandler} />
                </div>
                <div className="formControl">
                    <select name="category" id="category" onChange={categoryHandler} value={selectedCategory}>
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                    </select>
                </div>
                <div className="formControl">
                    <label htmlFor="destinations">Select your destination (-s): </label> <br />
                    {destinations.map(destination => (
                        <div key={destination._id}>
                            <input type="checkbox" value={destination._id} id={destination._id} checked={selectedDestinations.includes(destination._id)} onChange={destinationHandler} />
                            <label htmlFor={destination._id}>{destination.name}</label>
                        </div>
                    ))}
                </div>
            
            
            
                <button type="submit">Create!</button>
            </form>

        </>
    )
}
export default TripsForm