import { NavLink } from "react-router-dom"
import './PageNavigator.css'

const PageNavigator: React.FC = () => {

    return (
        <div className="pageNavigators">
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/trips'}>Trips</NavLink>
        </div>
    )
}
export default PageNavigator