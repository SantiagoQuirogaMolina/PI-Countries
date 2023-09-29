
import "./navbar.css?inline";

import { Link, NavLink } from 'react-router-dom';


const Nav = ({}) => {
    
    return(
        <nav className="nav">
            
            <Link to='/about'>
                <button>About</button>
            </Link>

            <NavLink to='/home'>
                <button>Home</button>
            </NavLink>

            <NavLink to='/favorites'>
                <button>Favorites</button>
            </NavLink>
        </nav>
    )
};
export default Nav;