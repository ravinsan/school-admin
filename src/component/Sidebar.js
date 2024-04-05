import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(
    localStorage.getItem("isSubMenuOpen") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isSubMenuOpen", isSubMenuOpen);
  }, [isSubMenuOpen]);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main Menu</span>
              </li>
              <li>
                <Link to="/dashboard" className="active">
                  <i className="feather-grid" /> <span> Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="active">
                  <i className="fas fa-book-reader" />
                  <span>Teacher</span>
                </Link>
              </li>
              <li>
                <Link to="/students" className="active">
                  <i className="fas fa-book-reader" />
                  <span>Student</span>
                </Link>
              </li>
              <li className={isSubMenuOpen ? "submenu active" : "submenu"}>
                <a href="#!" onClick={toggleSubMenu}>
                  <i className="fas fa-book-reader" /> <span> Master</span>{" "}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: isSubMenuOpen ? "block" : "none" }}>
                  <li>
                    <Link to="/authors">Author</Link>
                  </li>
                  <li>
                    <Link to="/sections">Section</Link>
                  </li>
                  <li>
                    <Link to="/books">Book</Link>
                  </li>
                </ul>
              </li>
              {/* Other menu items */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
