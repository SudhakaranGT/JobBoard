import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";

const Myjobs = () => {
  const user = "google";
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    fetch("jobs.json")
      //fetch(`http://localhost:3000/all-jobs/${user}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, [searchText]);

  const handleSearch = () => {
    const filter = jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );

    setJobs(filter);
    setIsLoading(false);
  };

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/job/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          // Corrected typo here
          Swal.fire("Success", "Job deleted Successfully!", "success");
        }
      });
  };

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalJobs = jobs.length;

  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-screen-2xl container mx-auto xl:px-24 px-4"
      >
        <div className="my-jobs-container mb-9">
          <h1 className="text-3xl font-bold text-center mb-9">
            Posted <span className="text-blue">Jobs</span>
          </h1>
          <div className="flex justify-center mx-2">
            <div className="relative lg:w-6/12 w-full">
              <input
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                name="search"
                id="search"
                className="py-2 pl-10 pr-3 border focus:outline-none w-full neumorphic-input"
                placeholder="Search in your posted job..!"
              />
              <FiSearch
                style={{ color: "#787878" }}
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
            </div>
            <button
              onClick={handleSearch}
              type="submit"
              style={{
                boxShadow: "8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff",
              }}
              className="bg-blue py-2 px-8 text-white md:rounded-s-none rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Search
            </button>
          </div>
        </div>
        <section className="py-1 bg-white">
          <div className="w-full xl:">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Job Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Salary
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Applicants
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  currentJobs.map((job, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {indexOfFirstJob + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.jobTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.jobLocation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.minPrice}k - {job.maxPrice}k
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue underline">
                        <Link to={"/applicants"}>Applicants</Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue underline">
                        <Link to={`/edit-job/${job?.id}`}>Edit</Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  underline">
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="bg-blue py-2 px-6 text-white rounded-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
        <div className="flex justify-center mt-4">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-blue hover:text-white hover:scale-105"
            >
              Previous
            </button>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ">
              Page <span className="text-blue mx-1">{currentPage}</span> of{" "}
              {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-blue hover:text-white hover:scale-105"
            >
              Next
            </button>
          </nav>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Myjobs;
