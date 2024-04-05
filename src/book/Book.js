import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { API_URL } from "../Config";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Book = () => {

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
          const response = await axios.get(`${API_URL}/book`, {
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
        const response = await axios.get(`${API_URL}/book/status/${id}`, {
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
  
  // Book Delete
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
      const response = await axios.delete(`${API_URL}/book/${id}`, {
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
              <h3 className="page-title">Book</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Book</li>
              </ul>
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
                      <h3 className="page-title">Book</h3>
                    </div>
                    <div className="col-auto text-end float-end ms-auto download-grp">
                      {/* <a href="#!" className="btn btn-outline-primary me-2">
                        <i className="fas fa-download" /> Download
                      </a> */}
                      <Link to="/book-create" className="btn btn-primary">
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
                        <th>Author Name</th>
                        <th>Subject Name</th>
                        <th>Grade Name</th>
                        <th>Title</th>
                        <th>Price (&#8377;)</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {currentItems?.map((v, index) => (
                      <tr key={v.id}>
                        <td>{++index}</td>
                        <td>{v.author.author_name}</td>
                        <td>{v.subject.subject_name}</td>
                        <td>{v.grade.grade_name}</td>
                        <td>{v.title}</td>
                        <td>{v.price}</td>
                        <td>
                          {v.status === 1 ? (
                                <button onClick={()=>handleStatusChange(v.id)} className="btn btn-success">Active</button>
                              ) : (
                                <button onClick={()=>handleStatusChange(v.id)} className="btn btn-danger">Inactive</button>
                              )}
                        </td>
                        <td className="text-end">
                          <div className="actions">
                            <Link
                              to="/edit-book/1"
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
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default Book;
