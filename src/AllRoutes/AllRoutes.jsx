import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import AuthCallbackHandler from "../components/auth/AuthCallbackHandler";

function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/google/callback" element={<AuthCallbackHandler />} />
      </Routes>
    </>
  );
}

export default AllRoutes;
