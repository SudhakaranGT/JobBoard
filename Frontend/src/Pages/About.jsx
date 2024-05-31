import React from "react";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";
import { FcBriefcase } from "react-icons/fc";

const About = () => {
  return (
    <div className="w-full px-4 py-8 font-family">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-md shadow-lg mx-auto max-w-screen-lg"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold text-blue mb-4 flex items-center gap-2"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-gray-800 mb-4"
        >
          Welcome to JobPortal, your number one source for all things jobs.
          We're dedicated to giving you the very best of job listings, with a
          focus on reliability, customer service, and uniqueness.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-lg text-gray-800 mb-4"
        >
          Founded in 2023 by the WorkWave team, JobPortal has come a long way
          from its beginnings in a home office. When we first started out, our
          passion for helping people find their dream jobs drove us to create
          this platform, turning hard work and inspiration into a booming online
          job portal. We now serve customers all over the world, and are
          thrilled to be a part of the quirky, eco-friendly, fair trade wing of
          the job portal industry.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-lg text-gray-800 mb-4"
        >
          We hope you enjoy our job listings as much as we enjoy offering them
          to you. If you have any questions or comments, please don't hesitate
          to contact us.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-lg text-gray-800"
        >
          Sincerely,
          <br />
          The WorkWave Team
        </motion.p>
      </motion.div>
      <Footer />
    </div>
  );
};

export default About;
