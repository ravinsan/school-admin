import React, { useState } from "react";
import { API_LoginUrl } from "../Config2";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProfile, setToken, setUser } from "../redux/profileReducer";

const Login = () => {
  const navigate = useNavigate();  
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); 
  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password Length must be 6 or more than 6";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(`${API_LoginUrl}/school-login`, formData);
        if (response.data.status === true) {
          // localStorage.setItem("token",response.data.records.token);
            // localStorage.setItem("name",response.data.records.name);
            // localStorage.setItem("data",response.data.records);
            
            dispatch(setToken(response.data.records.token));
            dispatch(setProfile(response.data.records));
            dispatch(setUser(response.data.records.user.name));

          toast.success(response.data.message);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error(error.message);
        toast.error(error.message);
      }finally {
        setLoading(false); 
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img
                  className="img-fluid"
                  src="admin/assets/img/login.png"
                  alt="Logo"
                />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Welcome to Preskool</h1>
                  <p className="account-subtitle">
                    Need an account? <a href="register.html">Sign Up</a>
                  </p>
                  <h2>Sign in</h2>
                  <form action="index.html">
                    <div className="form-group">
                      <label>
                        Username <span className="login-danger">*</span>
                      </label>
                      <input
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.email}
                      <span className="profile-views">
                        <i className="fas fa-user-circle" />
                      </span>
                    </div>
                    <div className="form-group">
                      <label>
                        Password <span className="login-danger">*</span>
                      </label>
                      <input
                        className={`form-control pass-input ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        name="password"
                        value={password}
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.password}
                      <span className="profile-views feather-eye toggle-password" />
                    </div>

                    <div className="form-group">
                    {loading ? (
                      <div className="text-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="form-group">
                        <button
                          className="btn btn-primary btn-block"
                          type="button"
                          onClick={handleSubmit}
                        >
                          Login
                        </button>
                      </div>
                    )}
                    </div>
                  </form>
                  <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">or</span>
                  </div>
                  <div className="social-login">
                    <a href="#!">
                      <i className="fab fa-google-plus-g" />
                    </a>
                    <a href="#!">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#!">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="#!">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
