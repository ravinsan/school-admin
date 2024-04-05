import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Layout from './component/Layout';
import Login from './component/Login';

function App() {
  const token = useSelector((state)=>state.profile.token);
  const loginRoute = (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Login/>} />
      <Route path="*" element={<Login/>} />
    </Routes>
  )
  
  return (
    <>
    <ToastContainer/>
     {
       token ?
        <>
          <Layout/>
        </>
        :
        loginRoute
     }
    </>
  );

  
}

export default App;
