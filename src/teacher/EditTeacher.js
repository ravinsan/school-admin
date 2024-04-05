import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../Config";
import { toast } from "react-toastify";

const EditTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const token = useSelector((state) => state.profile.token);
  const [loading, setLoading] = useState(false);

  const [editteacher, setEditTeacher] = useState({
    name: "",
    email: "",
    mobile: "",
    gander: "",
    dob: "",
    joiningdate: "",
    highestqualification: "",
    experience: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const {
    name,
    email,
    mobile,
    gander,
    dob,
    joiningdate,
    highestqualification,
    experience,
    address,
    city,
    state,
    country,
    pincode,
  } = editteacher;

  const [file, setFile] = useState();

  useEffect(()=>{
    editApi();
  },[]);

  const editApi = async () => {
    axios
      .get(`${API_URL}/teachers/edit/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        
        console.log(response.data.records);
        setEditTeacher({
          name                : response.data.records.name,
          email               : response.data.records.email,
          mobile              : response.data.records.mobile,
          gander              : response.data.records.gander,
          dob                 : response.data.records.dob,
          joiningdate         : response.data.records.joining_date,
          highestqualification: response.data.records.highest_qualification,
          experience          : response.data.records.experience,
          address             : response.data.records.address,
          city                : response.data.records.city_id,
          state               : response.data.records.state_id,
          country             : response.data.records.country_id,
          pincode             : response.data.records.pin_code,
        });

      }).catch((error) => {
        console.error("Error fetching school data:", error);
      });
  };

  

  let updateObject = {
    image            : file,
    name             : name,
    email            : email,
    mobile           : mobile,
    gander           : gander,
    dob              : dob,
    joining_date     : joiningdate,
    highest_qualification : highestqualification,
    experience       : experience,
    address          : address,
    city_id          : city,
    state_id         : state,
    country_id       : country,
    pin_code         : pincode,
  }

  const validateForm = () =>{
    let errors = {};
    
    if(!name){
      errors.name = "Name is required";
    }

    if(!email){
      errors.email = "Email is required";
    }

    if(!mobile){
      errors.mobile = "Mobile is required";
    }

    if(!gander){
      errors.gander = "Gender is required";
    }

    if(!dob){
      errors.dob = "DOB is required";
    }

    if(!experience){
      errors.experience = "Experience is required";
    }

    if(!joiningdate){
      errors.joiningdate = "Joining Date is required";
    }

    if(!highestqualification){
      errors.highestqualification = "Highest Qualification is required";
    }
    
    if(!address){
      errors.address = "Address is required"
    }

    if(!city){
      errors.city = "City is required"
    }

    if(!state){
      errors.state = "State is required"
    }

    if(!country){
      errors.country = "Country is required"
    }

    if(!pincode){
      errors.pincode = "Pincode is required"
    }

    return errors;

  }

  const updateData = async ()=>{
    
    const errors = validateForm();
    if(Object.keys(errors).length === 0) 
    {
      setLoading(true);
        try{
              const response = await axios.post(`${API_URL}/teachers/${id}`,updateObject, {
                headers:{
                  Authorization : `Bearer ${token}`,
                  "Content-Type": "multipart/form-data", 
                        "Accept": "application/json",
                }
              })

              console.log(response.data);
              if(response.data.status === true)
              {
                toast.success(response.data.message);
                navigate("/teachers");
              }
              else
              {
                toast.error(response.data.error);
              }
        }
        catch(error)
        {
          console.error(error.message);
          toast.error(error.message);
          setLoading(false); 
        }finally {
          setLoading(false); 
        }
    }
    else
    {
      setErrors(errors);
    }    
  }


  const handleChange = (event) =>{
    const {name,value} = event.target;
    setEditTeacher((prevData)=>({
      ...prevData,
      [name] : value,
    }))
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
                        <input className={`form-control ${errors.name ? "is-invalid" : ""}`} type="text" placeholder="Enter Name" name="name" value={name} onChange={(e)=>{handleChange(e)}} />
                        <span className="text-danger">{errors.name}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Email ID <span className="login-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className={`form-control ${errors.email ? "is-invalid" : ""}`}
                          placeholder="Enter Mail Id"
                          name="email"
                          value={email}
                          onChange={(e)=>{handleChange(e)}}
                        />
                        <span className="text-danger">{errors.email}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Gender <span className="login-danger">*</span>
                        </label>
                        <select
                          className={`form-control select ${errors.gander ? "is-invalid" : ""}`}
                          name="gander"
                          value={gander}
                          onChange={(e)=>{handleChange(e)}}
                        >
                          <option value="">Select Gender</option>
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                          <option value="3">Others</option>
                        </select>
                        <span className="text-danger">{errors.gander}</span>
                        
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Date Of Birth <span className="login-danger">*</span>
                        </label>
                        <input
                          className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                          type="date"
                          placeholder="DD-MM-YYYY"
                          name="dob"
                          value={dob}
                          onChange={(e)=>{handleChange(e)}}
                        />
                        <span className="text-danger">{errors.dob}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Mobile <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                          placeholder="Enter Phone"
                          name="mobile"
                          value={mobile}
                          onChange={(e)=>{handleChange(e)}}
                        />
                        <span className="text-danger">{errors.mobile}</span>
                        
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Joining Date <span className="login-danger">*</span>
                        </label>
                        <input
                          className={`form-control ${errors.joiningdate ? "is-invalid" : ""}`}
                          type="date"
                          name="joiningdate"
                          value={joiningdate}
                          onChange={(e)=>{handleChange(e)}}
                        />
                        <span className="text-danger">{errors.joiningdate}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4 local-forms">
                      <div className="form-group">
                        <label>
                          Qualification <span className="login-danger">*</span>
                        </label>
                        <input
                          className={`form-control ${errors.highestqualification ? "is-invalid" : ""}`}
                          type="text"
                          placeholder="Enter Highest Qualification"
                          name="highestqualification"
                          value={highestqualification}
                          onChange={(e)=>{handleChange(e)}}
                        />
                        <span className="text-danger">{errors.highestqualification}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Experience <span className="login-danger">*</span>
                        </label>
                        <input
                          className={`form-control ${errors.experience ? "is-invalid" : ""}`}
                          type="text"
                          placeholder="Enter Experience"
                          name="experience"
                          value={experience}
                          onChange={(e)=>{handleChange(e)}}
                        />
                        <span className="text-danger">{errors.experience}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div
                        className="form-group Schools-up-files"
                        style={{ marginTop: -6 }}
                      >
                        <label>Upload Schools Photo (150px X 150px)</label>
                        <div className="uplod">
                          <input
                              type="file"
                              name="file"
                              onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
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
                          className={`form-control ${errors.address ? "is-invalid" : ""}`}
                          placeholder="Enter address"
                          name="address"
                          value={address}
                          onChange={(e)=>{handleChange(e)}}
                        />
                        <span className="text-danger">{errors.address}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          City <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.city ? "is-invalid" : ""}`}
                          placeholder="Enter City"
                          name="city"
                          value={city}
                          onChange={(e)=>{handleChange(e)}}
                        />
                        <span className="text-danger">{errors.city}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          State <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.state ? "is-invalid" : ""}`}
                          placeholder="Enter State"
                          name="state"
                          value={state}
                          onChange={(e)=>{handleChange(e)}}
                        />
                        <span className="text-danger">{errors.state}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Country <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.country ? "is-invalid" : ""}`}
                          placeholder="Enter Country"
                          name="country"
                          value={country}
                          onChange={(e)=>{handleChange(e)}}
                        />
                        <span className="text-danger">{errors.country}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Zip Code <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.pincode ? "is-invalid" : ""}`}
                          placeholder="Enter Zip"
                          name="pincode"
                          value={pincode}
                          onChange={(e)=>{handleChange(e)}}
                        />
                        <span className="text-danger">{errors.pincode}</span>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="student-submit">
                      {loading ? (
                      <div className="text-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                        <button
                          type="button"
                          onClick={updateData}
                          className="btn btn-primary"
                        >
                          Submit
                        </button>
                       )}
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

export default EditTeacher;
