import React from "react";
import { Link, Navigate, NavigationType, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/profileReducer";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile  = useSelector((state)=>state.profile.profile);

  const handlelogout = () =>{
    localStorage.removeItem("token");
    toast.success("You have successfully logout!");
    dispatch(logout());

    window.location.reload(navigate("/"));
  }

  return (
    <>
      <div className="header">
        <div className="header-left">
          <Link to="/dashboard" className="logo">
            <img src="admin/assets/img/logo.png" alt="Logo" />
          </Link>
          <Link to="/dashboard" className="logo logo-small">
            <img
              src="admin/assets/img/logo-small.png"
              alt="Logo"
              width={30}
              height={30}
            />
          </Link>
        </div>
        <div className="menu-toggle">
          <Link to="#!" id="toggle_btn">
            <i className="fas fa-bars" />
          </Link>
        </div>

        <ul className="nav user-menu">


          <li className="nav-item dropdown has-arrow new-user-menus">
            <Link
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            >
              <span className="user-img">
                <img
                  className="rounded-circle"
                  src="admin/assets/img/profiles/avatar-01.jpg"
                  width={31}
                  alt={profile.user.name ? profile.user.name : 'Admin'}
                />
                <div className="user-text">
                  <h6>{profile.user.name}</h6>
                  <p className="text-muted mb-0">{profile.user.email}</p>
                </div>
              </span>
            </Link>
            <div className="dropdown-menu">
              <div className="user-header">
                <div className="avatar avatar-sm">
                  <img
                    src="admin/assets/img/profiles/avatar-01.jpg"
                    alt="User"
                    className="avatar-img rounded-circle"
                  />
                </div>
                <div className="user-text">
                  <h6>{profile.user.name}</h6>
                  <p className="text-muted mb-0">{profile.user.email}</p>
                </div>
              </div>
              <Link to="#!" className="dropdown-item">
                My Profile
              </Link>
              <Link to="#!" className="dropdown-item">
                Inbox
              </Link>
              <Link className="dropdown-item" onClick={handlelogout}>
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
