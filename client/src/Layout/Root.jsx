import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Root = () => {
  return (
    <div className="font-lato">
      <Header />
      <Outlet />
    </div>
  );
};

export default Root;
