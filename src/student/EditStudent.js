import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../Config';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const EditStudent = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories]   = useState([]);
  const [religions, setReligions]     = useState([]);
  const [bloodgroup, setBloodgroup]   = useState([]);
  const [sessiondata, setSession]     = useState([]);
  const [classesdata, setClassesData] = useState([]);
  const [types, setTypes]             = useState([]);
  const [sections, setSections]       = useState([]);
  const [grades, setGreades]          = useState([]);
  const [errors, setErrors]           = useState([]);
  const [file, setFile]               = useState("");
  const token                         = useSelector((state) => state.profile.token);
  const { id } = useParams();

  const [editstudent, setEditStudent] = useState({
        name : "", email : "", mobile : "", gender : "", dob : "", category : "",
        religion : "", cast : "", height : "", weight : "", blood_group : "", session : "",
        classes : "", section : "", type : "", grade : "", admission_type : "", date : "",
        roll : "", father_name : "", father_email : "", father_mobile : "", father_occupation : "",
        mother_name : "", mother_email : "", mother_mobile : "", mother_occupation : "",
        gaurdian_name : "", gaurdian_mobile : "", gaurdian_email : "", gaurdian_occupation : "",
        relationship : "", address : "", city : "", state : "", country : "", pincode : "",
  });

  const {name, email, mobile, gender, dob, category,
  religion, cast, height, weight, blood_group, session,
  classes, section, type, grade, admission_type, date,
  roll, father_name, father_email, father_mobile, father_occupation,
  mother_name, mother_email, mother_mobile, mother_occupation,
  gaurdian_name, gaurdian_mobile, gaurdian_email, gaurdian_occupation,
  relationship, address, city, state, country, pincode,} = editstudent;

let updateObject = {
    name : name, 
    email : email, 
    mobile: mobile, 
    gender : gender, 
    dob : dob, 
    category_id : category,
    religion_id : religion, 
    cast:cast, 
    height:height, 
    weight:weight, 
    blood_group_id:blood_group, 
    session_id : session,
    class_id:classes, 
    section_id : section, 
    type_id : type, 
    grade_id:grade, 
    admission_type : admission_type, 
    date:date,
    roll_no:roll, 
    father_name:father_name, 
    father_email:father_email, 
    father_phone:father_mobile, 
    father_occupation:father_occupation,
    mother_name:mother_name, 
    mother_email:mother_email, 
    mother_phone:mother_mobile, 
    mother_occupation:mother_occupation,
    gaurdian_name:gaurdian_name, gaurdian_phone:gaurdian_mobile, gaurdian_email:gaurdian_email, gaurdian_occupation:gaurdian_occupation,
    relation:relationship, address:address, city_id:city, state_id:state, country_id:country, pin_code:pincode,image:file}
    
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
  
      if(!gender){
        errors.gender = "Gender is required";
      }
  
      if(!dob){
        errors.dob = "DOB is required";
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

      if(!category){
        errors.category = "Please select category"
      }

      if(!religion){
        errors.religion = "Please select religion"
      }

      if(!cast){
        errors.cast = "Enter the cast name"
      }

      if(!session){
        errors.session = "Please select session"
      }

      if(!classes)
      {
        errors.classes = "Please select class"
      }

      if(!section){
        errors.section = "Please select section"
      }

      if(!type){
        errors.type = "Please select type"
      }

      if(!admission_type){
        errors.admission_type = "Please select admission type"
      }

      if(!date){
        errors.date = "Date filed is required"
      }

      if(!father_name){
        errors.father_name = "Father name filed is required"
      }

      if(!father_mobile){
        errors.father_mobile = "Father mobile filed is required"
      }

      if(!mother_name){
        errors.mother_name = "Mother name filed is required"
      }

      if(!mother_mobile){
        errors.mother_mobile = "Mother mobile filed is required"
      }

      if(!gaurdian_name){
        errors.gaurdian_name = "Gaurdian name filed is required"
      }

      if(!gaurdian_mobile){
        errors.gaurdian_mobile = "Gaurdian mobile filed is required"
      }

      if(!relationship){
        errors.relationship = "Relationship filed is required"
      }
      
      return errors;
  
    }

    const updateData = async ()=>{
      const errors = validateForm();
      if(Object.keys(errors).length === 0) 
      {
        setLoading(true);
        try{
             const response = await axios.post(`${API_URL}/students/${id}`,updateObject, {
                 headers : {
                  Authorization : `Bearer ${token}`,
                  "Content-type" : 'multipart/form-data',
                  Accept         : 'Application/json',
                 }
             });

             console.log(response.data);
              if(response.data.status === true)
              {
                toast.success(response.data.message);
                navigate("/students");
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
        }
      }
      else
      {
        setErrors(errors);
      }  
    }

    useEffect(() => {
      fetchCategories(); 
      fetchReligions(); 
      fetchBloodgroup(); 
      fetchSession();
      fetchClassesdata();
      fetchSections();
      fetchTypes();
      fetchGrades();
      editApi();
    }, []);
    
    const editApi = async () => {
      axios
        .get(`${API_URL}/students/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          
          console.log(response.data.records);
          setEditStudent({
            name                : response.data.records.name,
            email               : response.data.records.email,
            mobile              : response.data.records.mobile,
            gender              : response.data.records.gender,
            dob                 : response.data.records.dob,
            address             : response.data.records.address,
            city                : response.data.records.city_id,
            state               : response.data.records.state_id,
            country             : response.data.records.country_id,
            pincode             : response.data.records.pin_code,
            category            : response.data.records.category_id,
            religion            : response.data.records.religion_id, 
            cast                : response.data.records.cast, 
            height              : response.data.records.height, 
            weight              : response.data.records.weight, 
            blood_group         : response.data.records.blood_group_id, 
            session             : response.data.records.session_id,
            classes             : response.data.records.class_id, 
            section             : response.data.records.section_id, 
            type                : response.data.records.type_id, 
            grade               : response.data.records.grade_id, 
            admission_type      : response.data.records.admission_type,
            date                : response.data.records.date,
            roll                : response.data.records.roll_no, 
            father_name         : response.data.records.father_name, 
            father_email        : response.data.records.father_email, 
            father_mobile       : response.data.records.father_phone, 
            father_occupation   : response.data.records.father_occupation,
            mother_name         : response.data.records.mother_name, 
            mother_email        : response.data.records.mother_email, 
            mother_mobile       : response.data.records.mother_phone, 
            mother_occupation   : response.data.records.mother_occupation,
            gaurdian_name       : response.data.records.gaurdian_name, 
            gaurdian_mobile     : response.data.records.gaurdian_phone, 
            gaurdian_email      : response.data.records.gaurdian_email, 
            gaurdian_occupation : response.data.records.gaurdian_occupation,
            relationship        : response.data.records.relation,      
          });
  
        }).catch((error) => {
          console.error("Error fetching school data:", error);
        });
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-category`,{
          headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type" : "multipart/form-data", 
              Accept       : "application/json", 
          }
        }); 
        //console.log(response.data.records);
        setCategories(response.data.records); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    const fetchReligions = async ()=> {
      try{
         const response = await axios.get(`${API_URL}/get-religion`, {
          headers:{
            Authorization  : `Bearer ${token}`,
            "Content-type" : 'Application/json',
            Accept         : 'Application/json', 
          }
         });
         //console.log(response.data);
         setReligions(response.data.records);
      }
      catch(error)
      {
        console.log("Error fetching religions :", error);
      }
    }
  
    const fetchBloodgroup = async ()=>{
       try
       {
         const response = await axios.get(`${API_URL}/get-blood-group`, {
              headers : {
                 Authorization  : `Bearer ${token}`,
                  "Content-type" : 'Application/json',
                  Accept         : 'Application/json', 
              }
         });
         setBloodgroup(response.data.records);
       }
       catch(error)
       {
         console.log("Error fetching blood group :", error);
       }
    }
  
    const fetchSession = async ()=>{
      try{
          const response = await axios.get(`${API_URL}/get-session`, {
            headers : {
              Authorization : `Bearer ${token}`,
              "Content-type": 'Application/json', 
              Accept        : 'Application/json', 
            }
          });
          // setSession(response.data.records);
          setSession(response.data.records);
      }
      catch(error)
      {
        console.log("Error fetching sessions :", error);
      }
    }
  
    const fetchClassesdata = async ()=>{
      try{
        const response = await axios.get(`${API_URL}/get-classes`, {
          headers : {
            Authorization : `Bearer ${token}`,
            "Content-type": 'Application/json', 
            Accept        : 'Application/json', 
          }
        });
        setClassesData(response.data.records);
      }
      catch(error)
      {
        console.log("Error fetching classes :", error);
      }
    }
  
    const fetchSections = async ()=>{
      try{
        const response = await axios.get(`${API_URL}/section`, {
          headers : {
            Authorization : `Bearer ${token}`,
            "Content-type": 'Application/json', 
            Accept        : 'Application/json', 
          }
        });
        setSections(response.data.records);
      }
      catch(error)
      {
        console.log("Error fetching sections :", error);
      }
    }
  
    const fetchTypes = async ()=>{
      try{
        const response = await axios.get(`${API_URL}/get-type`, {
          headers : {
            Authorization : `Bearer ${token}`,
            "Content-type": 'Application/json', 
            Accept        : 'Application/json', 
          }
        });
        setTypes(response.data.records);
      }
      catch(error)
      {
        console.log("Error fetching types :", error);
      }
    }
  
    const fetchGrades = async ()=>{
      try{
        const response = await axios.get(`${API_URL}/get-grade`, {
          headers : {
            Authorization : `Bearer ${token}`,
            "Content-type": 'Application/json', 
            Accept        : 'Application/json', 
          }
        });
        setGreades(response.data.records);
      }
      catch(error)
      {
        console.log("Error fetching greade :", error);
      }
    }  
  
    const handleChange   = (event) =>{
      const {name,value} = event.target;
      setEditStudent((prevData)=>({
        ...prevData,
        [name] : value,
      }))
    }
  return (
    <>
     <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm-12">
              <div className="page-sub-header">
                <h3 className="page-title">Edit Students</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="students.html">Student</a>
                  </li>
                  <li className="breadcrumb-item active">Edit Students</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card comman-shadow">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-12">
                      <h5 className="form-title student-info">
                        Student
                        <span>
                          <a href="#!">
                            <i className="feather-more-vertical" />
                          </a>
                        </span>
                      </h5>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Name <span className="login-danger">*</span></label>
                        <input
                          className={`form-control ${errors.name ? "is-invalid" : ""}`}
                          type="text"
                          name="name" value={name} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Name"/>
                          <span className="text-danger">{errors.name}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          E-Mail <span className="login-danger">*</span>
                        </label>
                        <input
                          className={`form-control ${errors.email ? "is-invalid" : ""}`}
                          type="email"
                          name="email" value={email} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Email Address"/>
                          <span className="text-danger">{errors.email}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Mobile <span className="login-danger">*</span>
                        </label>
                        <input
                          className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                          type="text"
                          name="mobile" value={mobile} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Mobile Number"/>
                          <span className="text-danger">{errors.mobile}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Gender <span className="login-danger">*</span>
                        </label>
                        <select className={`form-control select ${errors.gender ? "is-invalid" : ""}`} name="gender" value={gender} onChange={(e)=>{handleChange(e)}}>
                          <option value="">Select Gender</option>
                          <option value="1">Female</option>
                          <option value="2">Male</option>
                          <option value="3">Others</option>
                        </select>
                        <span className="text-danger">{errors.gender}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Date Of Birth <span className="login-danger">*</span>
                        </label>
                        <input
                          className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                          type="date"
                          name="dob" value={dob} onChange={(e)=>{handleChange(e)}}
                          placeholder="DD-MM-YYYY"/>
                          <span className="text-danger">{errors.dob}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Category <span className="login-danger">*</span>
                        </label>
                        <select className={`form-control select ${errors.category ? "is-invalid" : ""}`} name="category" value={editstudent.category} onChange={(e)=>{handleChange(e)}}>
                        <option>Please Select Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        <span className="text-danger">{errors.category}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Religion <span className="login-danger">*</span>
                        </label>
                        <select className={`form-control select ${errors.category ? "is-invalid" : ""}`} name="religion" value={religion} onChange={(e)=>{handleChange(e)}}>
                          <option>Please Select Religion </option>
                          {religions.map((religion) =>(
                            <option key={religion.id} value={religion.id}>{religion.name}</option>
                          ))}                          
                        </select>
                        <span className="text-danger">{errors.religion}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Cast </label>
                        <input
                          className={`form-control select ${errors.cast ? "is-invalid" : ""}`}
                          type="text"
                          name="cast" value={cast} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Cast"/>
                          <span className="text-danger">{errors.cast}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Height </label>
                        <input
                          className="form-control"
                          type="text"
                          name="height" value={height} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Height"
                          pattern="[0-9]+([.,][0-9]+)?"  inputmode="numeric"
                          title="Please enter a valid number (integer or float)"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Weight </label>
                        <input
                          className="form-control"
                          type="text"
                          name="weight" value={weight} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Weight"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Blood Group
                        </label>
                        <select className="form-control select" name="blood_group" value={blood_group} onChange={(e)=>{handleChange(e)}}>
                          <option>Please Select Group </option>
                          {bloodgroup.map((blood)=>(
                          <option key={blood.id} value={blood.id}>{blood.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
  {/* -------------------------Session Details------------------------------ */}
                    <div className="col-12">
                      <h5 className="form-title">
                        <span>Session Details</span>
                      </h5>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Session <span className="login-danger">*</span>
                        </label>
                        <select className={`form-control select ${errors.session ? "is-invalid" : ""}`} name="session" value={session} onChange={(e)=>{handleChange(e)}}>
                          <option>Please Select Session </option>
                          {sessiondata.map((v)=>(
                            <option kay={v.id} value={v.id}>{v.name}</option>
                          ))}
                        </select>
                        <span className="text-danger">{errors.session}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Class <span className="login-danger">*</span>
                        </label>
                        <select className={`form-control select ${errors.classes ? "is-invalid" : ""}`} name="classes" value={classes} onChange={(e)=>{handleChange(e)}}>
                          <option>Please Select Class </option>
                          {classesdata.map((v)=>(
                            <option kay={v.id} value={v.id}>{v.name}</option>
                          ))}
                        </select>
                        <span className="text-danger">{errors.classes}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Section <span className="login-danger">*</span>
                        </label>
                        <select className={`form-control select ${errors.section ? "is-invalid" : ""}`} name="section" value={section} onChange={(e)=>{handleChange(e)}}>
                          <option>Please Select Section </option>
                          {sections.map((v)=>(
                            <option kay={v.id} value={v.id}>{v.section_name}</option>
                          ))}
                        </select>
                        <span className="text-danger">{errors.section}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Type <span className="login-danger">*</span>
                        </label>
                        <select className={`form-control select ${errors.type ? "is-invalid" : ""}`} name="type" value={type} onChange={(e)=>{handleChange(e)}}>
                          <option>Please Select Type </option>
                          {types.map((v)=>(
                            <option kay={v.id} value={v.id}>{v.student_type}</option>
                          ))}
                        </select>
                        <span className="text-danger">{errors.type}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Grade
                        </label>
                        <select className="form-control select" name="grade" value={grade} onChange={(e)=>{handleChange(e)}}>
                          <option>Please Select Grade </option>
                          {grades.map((v)=>(
                            <option kay={v.id} value={v.id}>{v.grade_name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Admission Type </label>
                        <select className={`form-control select ${errors.admission_type ? "is-invalid" : ""}`} name="admission_type" value={admission_type} onChange={(e)=>{handleChange(e)}}>
                          <option value="">Please Admission Type </option>
                          <option value="New">New</option>
                          <option value="Old">Old</option>
                        </select>
                        <span className="text-danger">{errors.admission_type}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Date </label>
                        <input type="date" className={`form-control ${errors.date ? "is-invalid" : ""}`} name="date" value={date} onChange={(e)=>{handleChange(e)}}/>
                        <span className="text-danger">{errors.date}</span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Roll </label>
                        <input
                          className="form-control"
                          type="text"
                          name="roll" value={roll} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Roll Number"
                        />
                      </div>
                    </div>

    {/* -------------------------Gaurdian Details------------------------------ */}

                    <div className="col-12">
                      <h5 className="form-title">
                        <span>Gaurdian Details</span>
                      </h5>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Father Name <span className="login-danger">*</span></label>
                        <input
                          className={`form-control ${errors.father_name ? "is-invalid" : ""}`}
                          type="text"
                          name="father_name" value={father_name} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Father Name"/>
                          <span className="text-danger">{errors.father_name}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Father Mobile Number <span className="login-danger">*</span></label>
                        <input
                          className={`form-control ${errors.father_mobile ? "is-invalid" : ""}`}
                          type="text"
                          name="father_mobile" value={father_mobile} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Father Mobile Number"/>
                          <span className="text-danger">{errors.father_mobile}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Father Email Address </label>
                        <input
                          className="form-control"
                          type="text"
                          name="father_email" value={father_email} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Father Email Address"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Father Occupation </label>
                        <input
                          className="form-control"
                          type="text"
                          name="father_occupation" value={father_occupation} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Father Occupation"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Mother Name <span className="login-danger">*</span></label>
                        <input
                          className={`form-control ${errors.mother_name ? "is-invalid" : ""}`}
                          type="text"
                          name="mother_name" value={mother_name} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Mother Name"/>
                          <span className="text-danger">{errors.mother_name}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Mother Mobile Number <span className="login-danger">*</span></label>
                        <input
                          className={`form-control ${errors.mother_mobile ? "is-invalid" : ""}`}
                          type="text"
                          name="mother_mobile" value={mother_mobile} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Mother Mobile Number"/>
                          <span className="text-danger">{errors.mother_mobile}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Mother Email Address </label>
                        <input
                          className="form-control"
                          type="text"
                          name="mother_email" value={mother_email} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Mother Email Address"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Mother Occupation </label>
                        <input
                          className="form-control"
                          type="text"
                          name="mother_occupation" value={mother_occupation} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Mother Occupation"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Gaurdian Name <span className="login-danger">*</span></label>
                        <input
                          className={`form-control ${errors.gaurdian_name ? "is-invalid" : ""}`}
                          type="text"
                          name="gaurdian_name" value={gaurdian_name} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Gaurdian Name"/>
                          <span className="text-danger">{errors.gaurdian_name}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Gaurdian Mobile Number <span className="login-danger">*</span></label>
                        <input
                          className={`form-control ${errors.gaurdian_mobile ? "is-invalid" : ""}`}
                          type="text"
                          name="gaurdian_mobile" value={gaurdian_mobile} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Gaurdian Mobile Number"/>
                          <span className="text-danger">{errors.gaurdian_mobile}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Gaurdian Email Address </label>
                        <input
                          className="form-control"
                          type="text"
                          name="gaurdian_email" value={gaurdian_email} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Gaurdian Email Address"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Gaurdian Occupation </label>
                        <input
                          className="form-control"
                          type="text"
                          name="gaurdian_occupation" value={gaurdian_occupation} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Gaurdian Occupation"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>Relationship <span className="login-danger">*</span></label>
                        <input
                          className={`form-control ${errors.relationship ? "is-invalid" : ""}`}
                          type="text"
                          name="relationship" value={relationship} onChange={(e)=>{handleChange(e)}}
                          placeholder="Enter Relationship"/>
                          <span className="text-danger">{errors.relationship}</span>
                      </div>
                    </div>
{/* -------------------------Session Details------------------------------ */}
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
                          name="address" value={address} onChange={(e)=>{handleChange(e)}}
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
                          name="city" value={city} onChange={(e)=>{handleChange(e)}}

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
                          name="state" value={state} onChange={(e)=>{handleChange(e)}}
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
                          name="country" value={country} onChange={(e)=>{handleChange(e)}}
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
                          name="pincode" value={pincode} onChange={(e)=>{handleChange(e)}}
                        />
                        <span className="text-danger">{errors.pincode}</span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-group students-up-files">
                        <label>Upload Student Photo (150px X 150px)</label>
                        <div className="uplod">
                          <label className="file-upload image-upbtn mb-0">
                            Choose File <input type="file" name="file"
                              onChange={(e) => setFile(e.target.files[0])} />
                          </label>
                        </div>
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
                          Save
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
  )
}

export default EditStudent;
