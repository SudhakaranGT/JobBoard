import React from "react";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";

const UserProfile = ({ user }) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow bg-[#FAFAFA] lg:px-24 px-4 py-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-blue font-bold text-4xl mb-2">User Profile</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col md:flex-row items-center mb-8 gap-7"
          >
            <div className="md:w-1/3 w-full flex flex-col items-center">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                src="/images/userprofile.png"
                alt={`${user.firstName} profile`}
                className="w-56 h-56 object-cover rounded-full mb-4"
              />
            </div>
            <div className="md:w-2/3 w-full">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="text-gray-700 text-2xl mb-1"
              >
                {user.firstName} {user.lastName}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                className="text-gray-600 mb-1"
              >
                <strong>Email:</strong> {user.email}
              </motion.p>
              {user.type === "seeker" ? (
                <>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    className="text-gray-600 mb-1"
                  >
                    <strong>Type:</strong> {user.type}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.7 }}
                    className="text-gray-600 mb-1"
                  >
                    <strong>Joined:</strong>{" "}
                    {new Date(user.createAt).toLocaleDateString()}
                  </motion.p>
                </>
              ) : (
                <>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    className="text-gray-600 mb-1"
                  >
                    <strong>Company:</strong> {user.company}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.7 }}
                    className="text-gray-600 mb-1"
                  >
                    <strong>Type:</strong> {user.type}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.9 }}
                    className="text-gray-600 mb-1"
                  >
                    <strong>Joined:</strong>{" "}
                    {new Date(user.createAt).toLocaleDateString()}
                  </motion.p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default UserProfile;
