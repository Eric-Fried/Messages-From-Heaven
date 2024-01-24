import './Header.css';
import { Link, Outlet } from 'react-router-dom';

export function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow-sm">
        <div className="navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {/* TODO: Make these links to About and Catalog, with className "title" */}
            <li className="nav-item nav-link">
              <Link to="/about" className="title">
                About
              </Link>
            </li>

            <li className="nav-item nav-link">
              <Link to="/" className="title">
                Catalog
              </Link>
            </li>
            <li className="nav-item nav-link sign-up-link">
              <Link to="/sign-up" className="title">
                Sign Up
              </Link>
            </li>
            <li className="nav-item nav-link sign-up-link">
              <Link to="/sign-in" className="title">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
      {/* Render the Outlet here. */}
    </div>
  );
}
