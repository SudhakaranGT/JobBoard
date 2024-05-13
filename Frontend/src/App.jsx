import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import SearchJob from "./Pages/SearchJob";
import About from "./Pages/About";
import Myjobs from "./Pages/Myjobs";
import Createjob from "./Pages/Createjob";
import Updatejob from "./Pages/Updatejob";
import Login from "./Pages/Login";
import JobDetails from "./Pages/JobDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-jobs" element={<SearchJob />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-jobs" element={<Myjobs />} />
        <Route path="/post-a-job" element={<Createjob />} />
        <Route
          path="edit-job/:id"
          element={<Updatejob />}
          loader={({ params }) =>
            fetch(`http://localhost:3000/all-jobs/${params.id}`)
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/job/:id" element={<JobDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
