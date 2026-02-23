import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./modules/common/Home";
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";
import ForgotPassword from "./modules/common/ForgotPassword";

import AdminHome from "./modules/admin/AdminHome";
import OwnerHome from "./modules/user/Owner/OwnerHome";
import RenterHome from "./modules/user/renter/RenterHome";

import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

function App() {
  const date = new Date().getFullYear();
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
      setUserLoggedIn(true);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="App">
        <Router>
          <div className="content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />

              {/* Role-based Protected Routes */}
              {userLoggedIn && userData?.type === "Admin" && (
                <Route path="/adminhome" element={<AdminHome />} />
              )}
              {userLoggedIn && userData?.type === "Owner" && (
                <Route path="/ownerhome" element={<OwnerHome />} />
              )}
              {userLoggedIn && userData?.type === "Renter" && (
                <Route path="/renterhome" element={<RenterHome />} />
              )}
            </Routes>
          </div>

          <footer className="bg-light text-center text-lg-start">
            <div className="text-center p-3">© {date} Copyright: RentEase</div>
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
