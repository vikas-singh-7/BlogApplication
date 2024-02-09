import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/authService";
import { login, logout } from "./features/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
     .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        console.log("authService finally done ");
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen bg-slate-600 flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  ) : (
   null
  );
};

export default App;
