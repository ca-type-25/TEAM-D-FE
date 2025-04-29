import { NavLink } from "react-router-dom"
import Button from "@mui/material/Button"
import './PageNavigator.css'
import { useAuth } from "../../AuthContext"

const PageNavigator: React.FC = () => {

  const { user } = useAuth()
  

    return (
        <div className="pageNavigators">
            <NavLink to={'/'}>
                <Button variant="text" color="primary">Home</Button>
            </NavLink>
            <NavLink to={'/trips'}>
                <Button variant="text" color="primary">Trips</Button>
            </NavLink>
            <NavLink to={'/destinations'}>
                <Button variant="text" color="primary">Destinations</Button>
            </NavLink>
            <NavLink to={'/activities'}>
                <Button variant="text" color="primary">Activities</Button>
            </NavLink>
            <NavLink to={'/reviews'}>
                <Button variant="text" color="primary">Reviews</Button>
            </NavLink>

            {user ? (
                <>
                <NavLink to={'/my-trips'}>
                    <Button variant="text" color="primary">My trips</Button>
                </NavLink>

                <NavLink to={'/user-profile'}>
                    <Button variant="text" color="primary">Profile</Button>
                </NavLink>
                </>
            ) : (
                <>
                <NavLink to={'/login'}>
                    <Button variant="text" color="primary">Login</Button>
                </NavLink>
                <NavLink to={'/register'}>
                    <Button variant="text" color="primary">Register</Button>
                </NavLink>
                </>
            )}

            {user && (
                <NavLink to={'/user-profile'}>
                <Button variant="text" color="primary">Profile</Button>
            </NavLink>
            )}
        </div>
    )
}
export default PageNavigator