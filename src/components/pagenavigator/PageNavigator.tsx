import { NavLink } from "react-router-dom"
import './PageNavigator.css'

const PageNavigator: React.FC = () => {

    return (
        <div className="pageNavigators">
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/trips'}>Trips</NavLink>
            <NavLink to={'/countries'}>Countries</NavLink>
            <NavLink to={'/destinations'}>Destinations</NavLink>
            <NavLink to={'/activities'}>Activities</NavLink>
            <NavLink to={'/reviews'}>Reviews</NavLink>
            <NavLink to={'/my-trips'}>My trips</NavLink>
            <NavLink to={'/login'}>Login</NavLink>
            <NavLink to={'/register'}>Register</NavLink>
            <NavLink to={'/user-profile'}>Profile</NavLink>

        </div>
    )
}
export default PageNavigator