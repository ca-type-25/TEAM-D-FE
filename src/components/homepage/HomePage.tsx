import { Link } from "react-router-dom"

const HomePage: React.FC = () => {

    return (
        <div>
            <h1>Home page</h1>
            
        <div>
            <Link to={'/trips'}>Trips</Link>


        </div>


        </div>
    )
}
export default HomePage