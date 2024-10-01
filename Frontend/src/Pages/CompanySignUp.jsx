import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaGoogle,
  FaGithub,
  FaLinkedin,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Image from "../assets/signup.avif";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const CompanySignUp = ({ handleLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {

      console.log("Hello",data)
      const response = await fetch("http://localhost:3000/post-signup2", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log(result);
  
      if (result.acknowledged === true) {
        Swal.fire("Success", "Signed Up Successfully!", "success");
        reset();
        
        // Await handleLogin
        await handleLogin(result.user);
        
        navigate("/");
      } else {
        Swal.fire("Error", "There is a problem with the inputs", "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred. Please try again.", "error");
    }
  };
  

  return (
    <div className="max-w-screen-3xl mx-auto px-4 py-8 rounded-3xl bg-gray-200 shadow-xl">
      <div className="flex">
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-screen sm:w-1/2 flex flex-col justify-center items-center p-20 gap-5"
        >
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold">
              Welcome <span className="text-blue">New Recruiter!</span>
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <h1 className="text-3xl font-bold">Sign Up as Recruiter</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 w-full lg:w-2/3"
          >
            <div className="signup-flex">
              <div className="w-full relative">
                <label className="block mb-1 text-lg font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  {...register("firstName", { required: true, maxLength: 80 })}
                  className="create-job-input bg-gray-300 rounded-lg"
                />
              </div>
              <div className="w-full relative">
                <label className="block mb-1 text-lg font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  {...register("lastName", { required: true, maxLength: 80 })}
                  className="create-job-input bg-gray-300 rounded-lg"
                />
              </div>
              <div className="w-full relative">
                <label className="block mb-1 text-lg font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                  className="create-job-input bg-gray-300 rounded-lg"
                />
              </div>
              <div className="w-full relative">
                <label className="block mb-1 text-lg font-semibold">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", { required: true, maxLength: 80 })}
                    className="create-job-input bg-gray-300 rounded-lg pr-10"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 transform -translate-y-1/2 text-gray-500"
                    style={{ right: "0.75rem" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="w-full relative">
                <label className="block mb-1 text-lg font-semibold">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Enter your company"
                  {...register("company", { required: true, maxLength: 80 })}
                  className="create-job-input bg-gray-300 rounded-lg"
                />
              </div>
            </div>
            <input
              type="submit"
              value="Sign Up"
              className="block mt-10 bg-blue text-white font-semibold px-8 py-2 rounded-lg cursor-pointer hover:scale-105 w-full"
            />
          </form>
          <div className="flex flex-col gap-5 items-center justify-center mt-5">
            <h1 className="text-lg font-bold mr-5">Continue with</h1>
            <div className="flex gap-5">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center">
                <FaGoogle className="mr-2" />
                Google
              </button>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center">
                <FaGithub className="mr-2" />
                GitHub
              </button>
              <button className="bg-blue px-4 py-2 rounded-lg flex items-center">
                <FaLinkedin className="mr-2" />
                LinkedIn
              </button>
            </div>
          </div>
          <div className="flex gap-1  lg:flex-row flex-col flex-start mt-5 justify-center items-center">
            <h1 className="text-lg font-bold">Already have an account?</h1>
            <Link
              to={"/company-login"}
              className="text-blue underline"
              href="#"
            >
              Log In
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden h-screen sm:w-1/2 sm:flex bg-blue p-20"
        >
          <img src={Image} alt="image" />
        </motion.div>
      </div>
    </div>
  );
};

export default CompanySignUp;
