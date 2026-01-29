import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand */}
        <NavLink to="/" className="brand">
          Product<span>App</span>
        </NavLink>

        {/* Navigation */}
        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Add Product
          </NavLink>

          <NavLink
            to="/view-product"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            View Product
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
