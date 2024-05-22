import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";
import Swal from "sweetalert2";

const UpdateJob = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/editjob/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }

        const jobData = await response.json();
        setJob(jobData);
        console.log(jobData);

        const skills = jobData.skills.map((skill) => ({
          value: skill,
          label: skill,
        }));

        reset(jobData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, reset]);

  const onSubmit = (data) => {
    data.skills = selected;
    fetch(`http://localhost:3000/update-job/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          Swal.fire("Success", "Job Updated Successfully", "success");
          reset();
        } else {
          Swal.fire("Error", "There is a problem with the inputs", "error");
        }
      })
      .catch((error) => {
        Swal.fire("Error", "Something went wrong", "error");
        console.error("Error updating job:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const options = [
    { value: "Python", label: "Python" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Java", label: "Java" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React.js", label: "React.js" },
    { value: "AngularJS", label: "AngularJS" },
    { value: "Node.js", label: "Node.js" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "SQL", label: "SQL" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Express.js", label: "Express.js" },
    { value: "Django", label: "Django" },
    { value: "Flask", label: "Flask" },
    { value: "C++", label: "C++" },
    { value: "C#", label: "C#" },
    { value: "Ruby", label: "Ruby" },
    { value: "PHP", label: "PHP" },
    { value: "Swift", label: "Swift" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "Objective-C", label: "Objective-C" },
    { value: "Git", label: "Git" },
    { value: "GitHub", label: "GitHub" },
    { value: "AWS", label: "AWS" },
    { value: "Azure", label: "Azure" },
    { value: "Google Cloud Platform", label: "Google Cloud Platform" },
    { value: "Docker", label: "Docker" },
    { value: "Kubernetes", label: "Kubernetes" },
    { value: "TensorFlow", label: "TensorFlow" },
    { value: "PyTorch", label: "PyTorch" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Deep Learning", label: "Deep Learning" },
    { value: "Data Science", label: "Data Science" },
    { value: "Artificial Intelligence", label: "Artificial Intelligence" },
    { value: "Big Data", label: "Big Data" },
    { value: "Blockchain", label: "Blockchain" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile Development", label: "Mobile Development" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Responsive Design", label: "Responsive Design" },
    { value: "Agile Methodologies", label: "Agile Methodologies" },
    { value: "Scrum", label: "Scrum" },
    { value: "DevOps", label: "DevOps" },
    {
      value: "Continuous Integration/Continuous Deployment (CI/CD)",
      label: "Continuous Integration/Continuous Deployment (CI/CD)",
    },
    { value: "Microservices", label: "Microservices" },
    { value: "RESTful APIs", label: "RESTful APIs" },
    { value: "GraphQL", label: "GraphQL" },
    { value: "Networking", label: "Networking" },
    { value: "System Administration", label: "System Administration" },
    { value: "Linux", label: "Linux" },
    { value: "Windows Server", label: "Windows Server" },
    { value: "Shell Scripting", label: "Shell Scripting" },
    { value: "Virtualization", label: "Virtualization" },
    { value: "Containerization", label: "Containerization" },
    { value: "Cloud Computing", label: "Cloud Computing" },
    { value: "IoT (Internet of Things)", label: "IoT (Internet of Things)" },
    { value: "Embedded Systems", label: "Embedded Systems" },
    { value: "Robotics", label: "Robotics" },
    { value: "CAD/CAM Design", label: "CAD/CAM Design" },
    { value: "3D Modeling", label: "3D Modeling" },
    { value: "Game Development", label: "Game Development" },
    { value: "Virtual Reality (VR)", label: "Virtual Reality (VR)" },
    { value: "Augmented Reality (AR)", label: "Augmented Reality (AR)" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    {
      value: "Content Management Systems (CMS)",
      label: "Content Management Systems (CMS)",
    },
  ];
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="neumorphic-bg max-w-screen-2xl container mx-auto xl:px-24 px-4"
      >
        <div className="flex justify-center items-center ">
          <h1 className="text-3xl font-bold">
            Update <span className="text-blue">Job</span>
          </h1>
        </div>
        <div className="bg-[#FAFAFA] py-7 px-4 lg:px-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg">Job title</label>
                <input
                  type="text"
                  {...register("jobTitle", { required: true, maxLength: 80 })}
                  className="create-job-input"
                  defaultValue={job.jobTitle}
                />
              </div>
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg">Company name</label>
                <input
                  type="text"
                  placeholder="Ex. Google"
                  {...register("companyName", {
                    required: true,
                    maxLength: 80,
                  })}
                  defaultValue={job.companyName}
                  className="create-job-input"
                />
              </div>
            </div>

            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg">Minimum Salary</label>
                <input
                  type="text"
                  placeholder="Ex: 20k"
                  {...register("minPrice", { required: true, maxLength: 80 })}
                  className="create-job-input"
                  defaultValue={job.minPrice}
                />
              </div>
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg">Maximum Salary</label>
                <input
                  type="text"
                  placeholder="Ex: 120k"
                  {...register("maxPrice", { required: true, maxLength: 80 })}
                  className="create-job-input"
                  defaultValue={job.maxPrice}
                />
              </div>
            </div>

            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg">Salary Type</label>
                <select
                  {...register("salaryType", { required: true })}
                  className="create-job-input"
                >
                  <option value="">Select Salary Type</option>
                  <option value="Hourly">Hourly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg">Job Location</label>
                <input
                  type="text"
                  placeholder="Enter the job location: Ex. Chennai"
                  {...register("jobLocation", {
                    required: true,
                    maxLength: 80,
                  })}
                  className="create-job-input"
                  defaultValue={job.jobLocation}
                />
              </div>
            </div>

            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg">Posting Date</label>
                <input
                  type="date"
                  {...register("postingDate", { required: true })}
                  className="create-job-input"
                />
              </div>
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg">Experience Level</label>
                <select
                  {...register("experienceLevel", { required: true })}
                  className="create-job-input"
                >
                  <option value="">Select Experience Level</option>
                  <option value="NoExperience">No Experience</option>
                  <option value="Internship">Internship</option>
                  <option value="WorkRemotely">Work remotely</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-lg">Required Skills</label>
              <CreatableSelect
                className="create-job-input py-4"
                value={selected}
                onChange={setSelected}
                options={options}
                isMulti
              />
            </div>

            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg">Company Logo</label>
                <input
                  type="text"
                  placeholder="Enter the logo URL"
                  {...register("companyLogo")}
                  className="create-job-input"
                />
              </div>
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg">Employment Type</label>
                <select
                  {...register("employmentType", { required: true })}
                  className="create-job-input"
                >
                  <option value="">Select Employment Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Temporary">Temporary</option>
                </select>
              </div>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-lg">Job Description</label>
              <textarea
                {...register("description", { required: true })}
                className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700 bg-gray-200"
                rows={4}
                placeholder="Enter the job description here"
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-lg">About the Company</label>
              <textarea
                {...register("aboutCompany", { required: true })}
                className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700 bg-gray-200"
                rows={4}
                placeholder="Tell about your company"
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-lg">Job Posted By</label>
              <input
                type="text"
                placeholder="Enter Email: Ex. google.com"
                {...register("postedBy")}
                className="create-job-input"
              />
            </div>

            <input
              type="submit"
              value="Post"
              className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer hover:scale-105"
            />
          </form>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default UpdateJob;
