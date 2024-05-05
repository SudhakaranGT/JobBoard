import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./Pages/Home";
import SearchJob from "./Pages/SearchJob";
import About from "./Pages/About";
import Myjobs from "./Pages/Myjobs";
import Createjob from "./Pages/Createjob";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-jobs" element={<SearchJob />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-jobs" element={<Myjobs />} />
        <Route path="/post-job" element={<Createjob />} />
      </Routes>
    </Router>
  );
};

export default App;
