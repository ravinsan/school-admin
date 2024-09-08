import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap';
import { TailSpin } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { API_URL } from '../Config';
import { toast } from 'react-toastify';


const Section = () => {

  const [data, setData] = useState([]);
    const token         = useSelector((state)=>state.profile.token);
    const [loading, setLoading]           = useState(true);
    const [currentPage, setCurrentPage]   = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const MySwal = withReactContent(Swal);
    const [updatedName, setUpdatedName] = useState("");
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");

    useEffect(()=>{
      getData();
  }, [])

// Get Records
  const getData = async ()=>{
    try{
          const response = await axios.get(`${API_URL}/section`, {
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

/*For Add Records */
async function saveSection() {
  if (!name.trim()) {
    setNameError("Please enter the section name");
    return;
  }

  const formData = new FormData();
  formData.append("section_name", name);

  try {
    const response = await axios.post(`${API_URL}/section`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });

    if (response.data.status === true) {
      toast.success(response.data.message);
      getData();
      setName("");
    } else {
      setNameError(response.data.error);
    }
  } catch (error) {
    toast.error("Data failed.");
  }
}

/* For Edit */
const handleEdit = (id, currentName) => {
  setEditId(id);
  setUpdatedName(currentName);
};

/* For Update */
const handleUpdate = async (id, newName) => {
  try {
    const response = await axios.put(
      `${API_URL}/section/${id}`,
      { section_name: newName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (response.data.status === true) {
      toast.success(response.data.message);
      getData();
      setEditId(null);
    } else {
      toast.error(response.data.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

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
      const response = await axios.get(`${API_URL}/section/status/${id}`, {
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
    const response = await axios.delete(`${API_URL}/section/${id}`, {
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
            <h3 className="page-title">Section</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Section</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="student-group-form">
        <div className="row">
          <div className="col-lg-9 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError("");
                }}
                placeholder="Please enter the section name"
              />
              {nameError && <p className="text-danger">{nameError}</p>}
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="search-student-btn">
              <button
                type="btn"
                onClick={saveSection}
                className="btn btn-primary"
              >
                Add Section
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

                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                    <thead className="student-thread">
                      <tr>
                        <th>#</th>
                        <th>Section Name</th>
                        <th>Status</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {currentItems?.map((v, index) => (
                      <tr key={v.id}>
                        <td>{++index}</td>
                        <td>
                            {editId === v.id ? (
                              <input
                                type="text"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                              />
                            ) : (
                              v.section_name
                            )}
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
                              {editId === v.id ? ( // If editing, show update button
                                <button
                                  onClick={() =>
                                    handleUpdate(v.id, updatedName)
                                  }
                                  className="btn btn-primary"
                                >
                                  Update
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleEdit(v.id, v.section_name)}
                                  className="btn btn-sm btn-success"
                                >
                                  <i className="feather-edit" />
                                </button>
                              )}

                              <button
                                onClick={() => handleDelete(v.id)}
                                className="btn btn-sm bg-danger text-white me-2 "
                              >
                                <i className="feather-trash" />
                              </button>
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
  )
}

export default Section;
