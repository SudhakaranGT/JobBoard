import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaLocationPin } from "react-icons/fa6";

const JobDetails = ({ user }) => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/job/${id}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data);
        } else {
          console.error("Failed to fetch job details");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleApply = () => {
    Swal.fire({
      title: "Upload Resume",
      input: "file",
      inputAttributes: {
        accept: ".pdf,.doc,.docx",
        "aria-label": "Upload your resume",
      },
      showCancelButton: true,
      confirmButtonText: "Upload",
      showLoaderOnConfirm: true,
      preConfirm: (file) => {
        if (!file) {
          Swal.showValidationMessage("No file selected");
          return false;
        }

        const formData = new FormData();
        formData.append("resume", file);
        formData.append("username", user.firstName + " " + user.lastName); // Replace with actual username
        formData.append("email", user.email); // Replace with actual email
        formData.append("jobId", id);

        return fetch("http://localhost:3000/upload-resume", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Upload failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Resume Uploaded",
          text: "Your resume has been successfully uploaded.",
          icon: "success",
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-blue text-xl">
        Loading...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen text-blue text-xl">
        Job not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-[#FAFAFA] lg:px-24 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center mb-4 gap-7 p-7">
            <div className="md:w-1/4 w-full flex justify-center md:justify-start mb-4 md:mb-0 h-full">
              <img
                src={job.companyLogo}
                alt={`${job.companyName} logo`}
                className="w-56 h-56 object-contain"
              />
            </div>
            <div className="md:w-3/4 w-full">
              <h1 className="text-blue font-bold text-5xl mb-2">
                {job.jobTitle}
              </h1>
              <h2 className="text-gray-700 text-2xl mb-1">{job.companyName}</h2>
              <h3 className="text-gray-600 flex items-center mb-2">
                <FaLocationPin className="mr-1" />
                {job.jobLocation}, India
              </h3>
              <p className="text-gray-600 mb-1">Posted on: {job.postingDate}</p>
              <p className="text-gray-600 mb-1 text-xl">
                <strong className="text-blue">Salary:</strong> ${job.minPrice}k
                - ${job.maxPrice}k {job.salaryType}
              </p>
              <p className="text-gray-600 mb-1 text-xl">
                <strong className="text-blue">Experience Level:</strong>{" "}
                {job.experienceLevel}
              </p>
              <p className="text-gray-600 mb-1 text-xl">
                <strong className="text-blue">Employment Type:</strong>{" "}
                {job.employmentType}
              </p>
            </div>
          </div>
          <div className="mb-2 p-7">
            <h4 className="text-2xl font-semibold mb-4">Required Skills</h4>
            <div className="flex flex-wrap gap-3">
              {job.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-blue text-white py-2 px-4 rounded-md"
                >
                  {skill.label}
                </div>
              ))}
            </div>
          </div>
          <div className="mb-2 p-7">
            <h4 className="text-2xl font-semibold mb-4">Job Description</h4>
            <p className="text-gray-700">{job.description}</p>
          </div>
          <div className="mb-2 p-7">
            <h4 className="text-2xl font-semibold mb-4">About the Company</h4>
            <p className="text-gray-700">{job.aboutCompany}</p>
          </div>
          <div className="flex gap-3 p-7">
            <button className="bg-blue text-white py-2 px-4 rounded-md hover:bg-black w-1/2 sm:w-full">
              Save
            </button>
            <button
              onClick={handleApply}
              className="bg-blue text-white py-2 px-4 rounded-md hover:bg-black w-1/2 sm:w-full"
            >
              Apply
            </button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetails;
