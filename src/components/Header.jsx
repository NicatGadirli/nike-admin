// Router
import { Link, NavLink } from "react-router-dom";

// Images
import Nike from "../assets/images/Nike.svg"

// Icons
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import { Auth } from "../utils/Auth";

const Header = () => {
  //?Auth
  const { token, logOut } = useContext(Auth)
  //?Auth

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="logo">
            <Link to="/">
              <img src={Nike} alt="logo" />
            </Link>
          </div>
          {
            token && <nav className="navBar">
              <ul className="navList">
                <li className="navItem">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="navItem">
                  <NavLink to="/all-product">All Products</NavLink>
                </li>
                <li className="navItem">
                  <NavLink to="/create-product">Add New Products</NavLink>
                </li>
              </ul>
            </nav>
          }

          <div className="userArea">
            {token && <button className="logOut" onClick={() => logOut()}>
              LOG OUT
              <FaSignOutAlt className="icon" />
            </button>}
            {!token && <Link className="login" to="/login">
              <FaUserCircle className="icon" />
              LOG IN
            </Link>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
