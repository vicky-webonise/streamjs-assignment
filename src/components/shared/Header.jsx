import { useLocation } from "react-router-dom";

import { NavLink } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Assignment
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {/*<li className="nav-item">
              <NavLink
                exact
                to="/signup"
                className="nav-link"
                activeClassName="text-primary"
              >
                Signup
              </NavLink>
            </li>
             <li className="nav-item">
              <NavLink
                exact
                to="/dashboard"
                className="nav-link"
                activeClassName="text-primary"
              >
                Dashboard
              </NavLink>
            </li> */}
            {location.pathname === `/dashboard` ? (
              <span className="navbar-text">Welcome user</span>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/login"
                    className="nav-link"
                    activeClassName="text-primary"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/signup"
                    className="nav-link"
                    activeClassName="text-primary"
                  >
                    Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/user-listing"
                    className="nav-link"
                    activeClassName="text-primary"
                  >
                    User Listing
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
