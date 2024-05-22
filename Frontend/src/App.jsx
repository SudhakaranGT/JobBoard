import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import SearchJob from "./Pages/SearchJob";
import About from "./Pages/About";
import Myjobs from "./Pages/Myjobs";
import Createjob from "./Pages/Createjob";
import Updatejob from "./Pages/Updatejob";
import JobDetails from "./Pages/JobDetails";
import CompanyLogin from "./Pages/CompanyLogin";
import CompanySignUp from "./Pages/CompanySignUp";
import UserLogin from "./Pages/UserLogin";
import UserSignUp from "./Pages/UserSignUp";
import Applicants from "./Pages/Applicants";
import Userprofile from "./Pages/Userprofile";
import Navbar from "./Components/Navbar";
import { jobLoader } from "./Components/jobLoader";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser));
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      setUser(null); // or set to a default user object
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Userprofile />} />
        {user?.type === "seeker" && (
          <>
            <Route path="/search-jobs" element={<SearchJob />} />
            <Route path="/about" element={<About />} />
            <Route path="/job/:id" element={<JobDetails user={user} />} />
          </>
        )}
        {user?.type === "recruiter" && (
          <>
            <Route
              path="/post-a-job"
              element={<Createjob email={user.email} />}
            />
            <Route path="/my-jobs" element={<Myjobs email={user.email} />} />
            <Route path="/edit-job/:id" element={<Updatejob />} />
            <Route path="/applicants/:id" element={<Applicants />} />
          </>
        )}
        <Route
          path="/login"
          element={<UserLogin handleLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={<UserSignUp handleLogin={handleLogin} />}
        />
        <Route
          path="/company-login"
          element={<CompanyLogin handleLogin={handleLogin} />}
        />
        <Route
          path="/company-signup"
          element={<CompanySignUp handleLogin={handleLogin} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
