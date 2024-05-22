import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import React, { useEffect, useState } from "react";
import Jobs from "./jobs";
import Card from "../Components/Card";
import { Link } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../Components/Newsletter";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";

const SearchJob = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setIsLoading(true);
    //fetch("jobs.json")
    fetch("http://localhost:3000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const calculatedPageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    if (query) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobTitle.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) => {
          const locationMatch =
            jobLocation.toLowerCase() === selected.toLowerCase();
          const maxPriceMatch = parseInt(maxPrice) <= parseInt(selected);
          const salaryTypeMatch =
            salaryType.toLowerCase() === selected.toLowerCase();
          const employmentTypeMatch =
            employmentType.toLowerCase() === selected.toLowerCase();
          const experienceLevelMatch =
            experienceLevel.toLowerCase() === selected.toLowerCase();
          const postingDateMatch = postingDate >= selected;

          return (
            locationMatch ||
            maxPriceMatch ||
            salaryTypeMatch ||
            employmentTypeMatch ||
            experienceLevelMatch ||
            postingDateMatch
          );
        }
      );
    }

    const { startIndex, endIndex } = calculatedPageRange();

    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  console.log("jobs:", jobs);
  console.log("selectedCategory:", selectedCategory);
  console.log("query:", query);

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Search query={query} handleInputChange={handleInputChange} />
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 rounded-sm shadow-lg"
        >
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-2 bg-white p-4 rounded-sm shadow-lg"
        >
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p className="text-blue">No Jobs Found!..</p>
            </>
          )}

          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:scale-105 hover:text-blue"
              >
                Previous
              </button>
              <span className="mx-2 hover:scale-105 hover:text-blue">
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="hover:scale-105 hover:text-blue"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 rounded-sm shadow-lg"
        >
          <Newsletter />
        </motion.div>
        
      </div>
      <Footer />
    </div>
  );
};

export default SearchJob;
