import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaGoogle,
  FaGithub,
  FaLinkedin,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Image from "../assets//login.png";
import { motion } from "framer-motion";

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission here
  };

  return (
    <div className="max-w-screen-3xl mx-auto bg-gray-200">
      <div className="flex">
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          div
          className="hidden h-screen sm:w-1/2 sm:flex bg-blue p-20 justify-center items-center"
        >
          <img src={Image} alt="image" className="h-3/4 w-3/4" />
        </motion.div>
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-screen sm:w-1/2 flex flex-col justify-center items-center p-20 gap-10"
        >
          <div className="flex justify-center items-center">
            <h1 className="text-3xl font-bold">
              Welcome <span className="text-blue">Back!</span>
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <h1 className="text-5xl font-bold">Log in</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 w-full lg:w-2/3"
          >
            <div className="login-flex">
              <div className="w-full">
                <label className="block mb-2 text-lg font-semibold">
                  Email or Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your Username or email"
                  {...register("username", { required: true, maxLength: 80 })}
                  className="create-job-input bg-gray-300 rounded-lg"
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-lg font-semibold">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", { required: true, maxLength: 80 })}
                    className="create-job-input bg-gray-300 rounded-lg pr-10"
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  {...register("rememberMe")}
                  className="mr-2"
                />
                <label htmlFor="remember-me" className="text-sm">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-blue text-sm">
                Forgot password?
              </a>
            </div>
            <input
              type="submit"
              value="Login"
              className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-lg cursor-pointer hover:scale-105 w-full"
            />
          </form>
          <div className="flex flex-col gap-5 items-center justify-center">
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
          <div className="flex gap-1 flex-row flex-start mt-5 justify-center items-center">
            <h1 className="text-lg font-bold">New to the Workwave</h1>
            <Link to={"/signup"} className="text-blue underline" href="">
              Signup
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserLogin;
