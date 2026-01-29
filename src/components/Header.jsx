import React from "react";
import { NavLink } from "react-router-dom";
import './Header.css'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        {/* Brand */}
        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          ProductApp
        </NavLink>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto gap-3">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link fw-semibold text-primary"
                    : "nav-link text-dark"
                }
              >
                Add Product
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/view-product"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link fw-semibold text-primary"
                    : "nav-link text-dark"
                }
              >
                View Product
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
