
import "./navbar.css?inline";

import { Link, NavLink } from 'react-router-dom';


const Nav = () => {
    
    return(
        <nav className="nav">
            
            <Link to='/home'>
                <button>About</button>
            </Link>

            <NavLink to='/home'>
                <button>Home</button>
            </NavLink>
            <NavLink to='/activities'>
                <button>Actividades</button>
            </NavLink>

        </nav>
    )
};
export default Nav;