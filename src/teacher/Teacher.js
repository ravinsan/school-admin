import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../Config";
import { TailSpin } from "react-loader-spinner";
import { Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";

const Teacher = () => {
  const [data, setData] = useState([]);
  const token  = useSelector((state)=>state.profile.token);
  const [loading, setLoading]           = useState(true);
  const [currentPage, setCurrentPage]   = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const MySwal = withReactContent(Swal);


  useEffect(()=>{
    getData();
  }, []);

  
  const getData = async () => {
    try{
          const response = await axios.get(`${API_URL}/teachers`, {
               headers : {
                Authorization : `Bearer ${token}`,
                "Content-Type": "application/json",
                 Accept: "application/json",
               }
          });
          // console.log(response.data.records);
          setData(response.data.records);
          setLoading(false);
        }
        catch(error)
        {
          console.error(error.message);
          setLoading(false);
        }    
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Status Change
  const handleStatusChange = async (id)=>{
    MySwal.fire({
      title: "Are you sure?",
      text: "You want to change this status!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
     try{
        const response = await axios.get(`${API_URL}/teachers/status/${id}`, {
          headers:{
            Authorization : `Bearer ${token}`,
            "Content-Type" : 'application/json',
            Accept : 'application/json',
          }
        })
        toast.success(response.data.message);
        getData();
     }
     catch(error)
     {
      toast.error(error.message);
     }
    }
  });
  }
  
  // Teacher Delete
  const handleDelete = async (id)=>{
    MySwal.fire({
      title: "Are you sure?",
      text: "You want to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
    try{
      const response = await axios.delete(`${API_URL}/teachers/${id}`, {
        headers :{
          Authorization : `Bearer ${token}`,
          'Content-Type' : 'application/json',
          Accept : 'application/json',
        }
      })
      toast.success(response.data.message);
      getData();
    }
    catch(error)
    {
      toast.error(error.message);
    }
   }
  });
  }
  return (
    <>
    {/* Loader */}
    {loading && (
        <div className="loader-container d-flex justify-content-center">
          {/* Use the specific loader component */}
          <TailSpin color="#00BFFF" height={280} width={180} />
        </div>
      )}
      {!loading && (
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Teachers</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Teachers</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="student-group-form">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by ID ..."
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Name ..."
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Phone ..."
                />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="search-student-btn">
                <button type="btn" className="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">Teachers</h3>
                    </div>
                    <div className="col-auto text-end float-end ms-auto download-grp">
                      <a
                        href="teachers.html"
                        className="btn btn-outline-gray me-2 active"
                      >
                        <i className="feather-list" />
                      </a>
                      <a
                        href="teachers-grid.html"
                        className="btn btn-outline-gray me-2"
                      >
                        <i className="feather-grid" />
                      </a>
                      <a href="#!" className="btn btn-outline-primary me-2">
                        <i className="fas fa-download" /> Download
                      </a>
                      <Link to="/teachers-create" className="btn btn-primary">
                        <i className="fas fa-plus" /> Add Teacher
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                    <thead className="student-thread">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Joining Date</th>
                        <th>Status</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {currentItems?.map((v, index) => (
                      <tr key={v.id}>
                        <td>{++index}</td>
                        <td>
                           <a href="#!" className="avatar avatar-sm me-2">
                              <img classname="avatar-img rounded-circle" src={v.image_path} alt="User Image" />
                            </a>

                           <a href="#!">{v.name}</a>                           
                          </td>
                        <td>{v.teacher_unique_id}</td>
                        <td>{v.email}</td>
                        <td>{v.mobile}</td>
                        <td>{new Date(v.joining_date).toLocaleDateString('en-IN')}</td>
                        <td>
                          {v.status === 1 ? (
                                <button onClick={()=>handleStatusChange(v.id)} className="btn btn-success">Active</button>
                              ) : (
                                <button onClick={()=>handleStatusChange(v.id)} className="btn btn-danger">Inactive</button>
                              )}
                        </td>
                        <td className="text-end">
                          <div className="actions">
                            {/* <a
                              href={`teachers/${v.id}`}
                              className="btn btn-sm bg-success-light me-2"
                            >
                              <i className="feather-eye" />
                            </a> */}
                            <Link
                              to={`${v.id}`}
                              className="btn btn-sm bg-danger-light"
                            >
                              <i className="feather-edit" />
                            </Link>
                            <span onClick={() => handleDelete(v.id)}
                                  className="btn btn-sm bg-danger-light me-2">
                                  <i className="feather-trash" />
                                </span>
                          </div>
                        </td>
                      </tr>
                    ))}  
                    </tbody>
                  </table>
                </div>
                <Pagination>
                    {Array.from({
                      length: Math.ceil(data.length / itemsPerPage),
                    }).map((_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default Teacher;
