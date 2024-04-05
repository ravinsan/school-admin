import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MyRoute from "./MyRoute";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <div className="main-wrapper">
        <Header />
        <Sidebar />
        <div className="page-wrapper">
          <main>
            <MyRoute />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
