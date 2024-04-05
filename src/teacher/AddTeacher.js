import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../Config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddTeacher = () => {
    const navigate = useNavigate();
    const token  = useSelector((state)=>state.profile.token);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [highestQualification, setHighestQualification] = useState("");
    const [experience, setExperience] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pincode, setPincode] = useState("");
    const [file, setFile] = useState("");
    
    async function saveTeacher()
    {

        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("password_confirmation", confirmPassword);
        formData.append("mobile", mobile);
        formData.append("gander", gender);
        formData.append("dob", dob);
        formData.append("joining_date", joiningDate);
        formData.append("highest_qualification", highestQualification);
        formData.append("experience", experience);
        formData.append("address", address);
        formData.append("city_id", city);
        formData.append("state_id", state);
        formData.append("country_id", country);
        formData.append("pin_code", pincode);

        try {
            const response = await axios.post(`${API_URL}/teachers`, formData,{
              headers : {
                  Authorization  : `Bearer ${token}`,
                  "Content-Type" : "multipart/form-data", 
                  "Accept"       : "application/json", 
              }
          });
            console.log('Data is successfully store.', response.data);
            if(response.data.status === true)
            {
              toast.success(response.data.message);
              navigate("/teachers");
            }
            else{
              // alert(response.data.error);
              toast.error(response.data.error);
            }
          } catch (error) {
            console.error('Error making POST request:', error);
            toast.error("Data failed.");
          }
    }
  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Add Teachers</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="teachers.html">Teachers</a>
                </li>
                <li className="breadcrumb-item active">Add Teachers</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-12">
                      <h5 className="form-title">
                        <span>Basic Details</span>
                      </h5>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Name <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Name"
                          name="name" value={name} onChange={(e)=>{setName(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Gender <span className="login-danger">*</span>
                        </label>
                        <select className="form-control select" name="gender" value={gender} onChange={(e)=>{setGender(e.target.value)}}>
                          <option value="">Select Gender</option>
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                          <option value="3">Others</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Date Of Birth <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="date"
                          placeholder="DD-MM-YYYY"
                          name="dob" value={dob} onChange={(e)=>{setDob(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Mobile <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Phone"
                          name="mobile" value={mobile} onChange={(e)=>{setMobile(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Joining Date <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="date"
                          name="joiningDate" value={joiningDate} onChange={(e)=>{setJoiningDate(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4 local-forms">
                      <div className="form-group">
                        <label>
                          Qualification <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Highest Qualification"
                          name="highestQualification" value={highestQualification} onChange={(e)=>{setHighestQualification(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group local-forms">
                        <label>
                          Experience <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Experience"
                          name="experience" value={experience} onChange={(e)=>{setExperience(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                    <div className="form-group Schools-up-files" style={{marginTop: -6}}>
                       <label>Upload Schools Photo (150px X 150px)</label>
                        <div className="uplod">
                          <label className="file-upload image-upbtn mb-0">Choose File                           
                          <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} /></label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <h5 className="form-title">
                        <span>Login Details</span>
                      </h5>
                    </div>
                    
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Email ID <span className="login-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Mail Id"
                          name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Password <span className="login-danger">*</span>
                        </label>
                        <input
                          type="Password"
                          className="form-control"
                          placeholder="Enter Password"
                          name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Repeat Password{" "}
                          <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Repeat Password"
                          name="confirmPassword" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <h5 className="form-title">
                        <span>Address</span>
                      </h5>
                    </div>
                    <div className="col-12">
                      <div className="form-group local-forms">
                        <label>
                          Address <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter address"
                          name="address" value={address} onChange={(e)=>{setAddress(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          City <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter City"
                          name="city" value={city} onChange={(e)=>{setCity(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          State <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter State"
                          name="state" value={state} onChange={(e)=>{setState(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Country <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Country"
                          name="country" value={country} onChange={(e)=>{setCountry(e.target.value)}}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Zip Code <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Zip"
                          name="pincode" value={pincode} onChange={(e)=>{setPincode(e.target.value)}}
                        />
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <div className="student-submit">
                      <button type="button" onClick={saveTeacher} className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTeacher;
