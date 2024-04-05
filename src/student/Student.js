import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { TailSpin } from "react-loader-spinner";
import { Pagination } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../Config";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Student = () => {
    const [data, setData] = useState([]);
    const token  = useSelector((state)=>state.profile.token);
    const [loading, setLoading]           = useState(true);
    const [currentPage, setCurrentPage]   = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const MySwal = withReactContent(Swal);

    useEffect(()=>{
        getData();
    }, [])

    const getData = async ()=>{
        try{
              const response = await axios.get(`${API_URL}/students`, {
                headers : {
                    Authorization : `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
              });

            console.log(response.data.records);
              setData(response.data.records);
              setLoading(false);
        }
        catch(error)
        {
            console.error(error.message);
            setLoading(false);
        }
    }

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
        const response = await axios.get(`${API_URL}/students/status/${id}`, {
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
  
  // Student Delete
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
      const response = await axios.delete(`${API_URL}/students/${id}`, {
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
          <div className="row">
            <div className="col-sm-12">
              <div className="page-sub-header">
                <h3 className="page-title">Students</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="students.html">Student</a>
                  </li>
                  <li className="breadcrumb-item active">All Students</li>
                </ul>
              </div>
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
            <div className="card card-table comman-shadow">
              <div className="card-body">
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">Students</h3>
                    </div>
                    <div className="col-auto text-end float-end ms-auto download-grp">
                      <a
                        href="students.html"
                        className="btn btn-outline-gray me-2 active"
                      >
                        <i className="feather-list" />
                      </a>
                      <a
                        href="students-grid.html"
                        className="btn btn-outline-gray me-2"
                      >
                        <i className="feather-grid" />
                      </a>
                      <a href="#!" className="btn btn-outline-primary me-2">
                        <i className="fas fa-download" /> Download
                      </a>
                      <Link to="/students-create" className="btn btn-primary">
                        <i className="fas fa-plus" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                    <thead className="student-thread">
                      <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>DOB</th>
                        <th>Parent Name</th>
                        <th>Mobile Number</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {currentItems?.map((v, index) => (
                      <tr key={v.id}>
                        <td>{++index}</td>
                        <td>{v.admission_id}</td>
                        <td>
                          <h2 className="table-avatar">
                            <a
                              href="student-details.html"
                              className="avatar avatar-sm me-2"
                            >
                              <img className="avatar-img rounded-circle"
                                src={v.image_path}
                              />
                            </a>
                            <a href="student-details.html">{v.name}</a>
                          </h2>
                        </td>
                        <td>{v.classes.name}</td>
                        <td>{v.dob}</td>
                        <td>{v.father_name}</td>
                        <td>{v.mobile}</td>
                        <td>
                            {v.address}, 
                            {v.pin_code}

                        </td>
                        <td>
                          {v.status === 1 ? (
                                <button onClick={()=>handleStatusChange(v.id)} className="btn btn-success">Active</button>
                              ) : (
                                <button onClick={()=>handleStatusChange(v.id)} className="btn btn-danger">Inactive</button>
                              )}
                        </td>
                        <td className="text-end">
                          <div className="actions ">
                            <a
                              href="#!"
                              className="btn btn-sm bg-success-light me-2 "
                            >
                              <i className="feather-eye" />
                            </a>
                            <Link
                              to={`${v.id}`}
                              className="btn btn-sm bg-danger-light"
                            >
                              <i className="feather-edit" />
                            </Link>
                            <a
                              href={`students-class-change/${v.id}`}
                              className="btn btn-sm bg-danger-light"
                            >
                              <i className="feather-edit" />
                            </a>
                            <buttona onClick={() => handleDelete(v.id)}
                                  className="btn btn-sm bg-danger-light me-2">
                                  <i className="feather-trash" />
                                </buttona>
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

export default Student;
