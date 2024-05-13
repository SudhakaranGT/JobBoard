import React from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

const Search = ({ query, handleInputChange }) => {
  return (
    <div className="bg-gray-100 rounded-lg max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14 h-200 w-9/10">
      <motion.h1
        className="text-5xl font-bold text-primary mb-3"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Find your <span className="text-blue">Dream Job</span> Today!
      </motion.h1>

      <motion.p
        className="text-lg text-black/70 mb-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Join Thousands of Successful Professionals Who Found Their Dream Jobs
        Through <span className="text-blue">JobBoard</span>
      </motion.p>

      <motion.form
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
          <div
            style={{
              boxShadow: "8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff",
            }}
            className="flex md:rounded-lg rounded shadow-md ring-1 ring-inset mr-1 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full"
          >
            <input
              type="text"
              name="title"
              id="title"
              className="block flex-1 border-0 bg-transparent py-2 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transition-shadow duration-300 rounded"
              placeholder="Enter the Job you're seeking?"
              onChange={handleInputChange}
              value={query}
            />
            <FiSearch
              style={{ color: "#787878" }}
              className="absolute mt-2.5 ml-2 text-gray-400"
            />
          </div>
          <div
            style={{
              boxShadow: "8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff",
            }}
            className="flex md:rounded-s-none  shadow-md ring-1  mr-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full"
          >
            <input
              type="text"
              name="location"
              id="location"
              className="block flex-1 border-0 bg-transparent py-2 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transition-shadow duration-300 rounded"
              placeholder="Enter the Location You want?"
            />
            <FiMapPin
              style={{ color: "#787878" }}
              className="absolute mt-2.5 ml-2 text-gray-400"
            />
          </div>
          <button
            type="submit"
            style={{
              boxShadow: "8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff",
            }}
            className="bg-blue py-2 px-8 text-white md:rounded-s-none rounded hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            Search
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Search;
