import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import myImage from "../assets/hero2.png";

const Hero = () => {
  return (
    <section className="bg-blue text-white pb-8">
      <div className="p-8 lg:px-20 lg:py-20 flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:w-1/2">
          {" "}
          {/* Adjusted width */}
          <div className="relative">
            <div className="absolute h-16 w-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full -right-8 -top-4" />
            <motion.h1
              initial={{ y: "2rem", opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, type: "spring" }}
              className="font-bold text-4xl lg:text-5xl leading-tight mb-4 gap-4"
            >
              Find Your{" "}
              <span className="text-[#001a36] text-4xl lg:text-5xl font-bold">
                Dream Job{" "}
              </span>
              with Ease
            </motion.h1>
          </div>
          <div className="flex flex-col gap-2 lg:gap-4 ">
            <span className="text-white text-xl font-semibold">
              Discover a wide range of job opportunities tailored to your skills
              and preferences.
            </span>

            <span className="text-white text-xl font-semibold">
              Explore job listings from top companies, start your career journey
              today.
            </span>
          </div>
          <div className="flex justify-between mt-8 lg:mt-8 w-3/4 gap-1">
            <div className="flex flex-col items-center">
              <span className="font-semibold text-2xl">
                <CountUp start={10} end={500} duration={3} />{" "}
                <span className="text-[#001a36]">+</span>
              </span>
              <span className="text-sm">Jobs Posts</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-semibold text-2xl">
                <CountUp start={3000} end={3200} duration={3} />{" "}
                <span className="text-[#001a36]">+</span>
              </span>
              <span className="text-sm">Satisfied Candidates</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-semibold text-2xl">
                <CountUp end={1000} duration={3}/> <span className="text-[#001a36]">+</span>
              </span>
              <span className="text-sm">Comapnies</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:w-1/2 mt-6 lg:mt-0">
          {" "}
          {/* Adjusted width */}
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: "spring" }}
            className="w-full lg:w-4/5"
          >
            <img src={myImage} alt="job search" className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
