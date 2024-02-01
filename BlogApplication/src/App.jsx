import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/authService";
import { logIn, logOut } from "./features/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(logIn({ userData }));
        } else {
          dispatch(logOut());
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
        todo {/* <Outlet /> */}
        <Footer />
      </div>
    </div>
  ) : (
    <div className="h-full w-full text-white flex flex-wrap justify-center align-center bg-black-400">
      oops page not found please login
    </div>
  );
};

export default App;
