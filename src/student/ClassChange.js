import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../Config';
import axios from 'axios';
import { toast } from 'react-toastify';

const ClassChange = () => {

  const navigate = useNavigate();
  const [loading, setLoading]         = useState(false);
  const [sessiondata, setSession]     = useState([]);
  const [classesdata, setClassesData] = useState([]);
  const [sections, setSections]       = useState([]);
  const [grades, setGreades]          = useState([]);
  const [errors, setErrors]           = useState([]);
  const token                         = useSelector((state) => state.profile.token);
  const { id }                        = useParams();

  const [editstudent, setEditStudent] = useState({
    session : "", classes : "", section : "", grade : "", admission_type : "", date : "",
    roll : ""
});

const {session, classes, section, grade, admission_type, date,
roll} = editstudent;

let updateObject = {
  session_id     : session,
  class_id       : classes, 
  section_id     : section, 
  grade_id       : grade, 
  admission_type : admission_type, 
  date           : date,
  roll_no        : roll
}

const validateForm = () =>{
  let errors = {};
  
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

  if(!admission_type){
    errors.admission_type = "Please select admission type"
  }

  if(!date){
    errors.date = "Date filed is required"
  }
 
  return errors;

}

const classChangeData = async ()=>{
  const errors = validateForm();
  if(Object.keys(errors).length === 0) 
  {
    setLoading(true);
    try{
         const response = await axios.post(`${API_URL}/students/class-change/${id}`,updateObject, {
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
  fetchSession();
  fetchClassesdata();
  fetchSections();
  fetchGrades();
  editApi();
}, []);

const editApi = async () => {
  axios.get(`${API_URL}/students/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      
      console.log(response.data.records);
      setEditStudent({
        session             : response.data.records.session_id,
        classes             : response.data.records.class_id, 
        section             : response.data.records.section_id, 
        grade               : response.data.records.grade_id, 
        admission_type      : response.data.records.admission_type,
        date                : response.data.records.date,
        roll                : response.data.records.roll_no,         
      });

    }).catch((error) => {
      console.error("Error fetching school data:", error);
    });
};


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
                <h3 className="page-title">Students Class Change</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="students.html">Student</a>
                  </li>
                  <li className="breadcrumb-item active">Students Class Change</li>
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
                    <div className="col-12 col-sm-4">
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
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>Date </label>
                        <input type="date" className={`form-control ${errors.date ? "is-invalid" : ""}`} name="date" value={date} onChange={(e)=>{handleChange(e)}}/>
                        <span className="text-danger">{errors.date}</span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
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
                          onClick={classChangeData}
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
  )
}

export default ClassChange;
