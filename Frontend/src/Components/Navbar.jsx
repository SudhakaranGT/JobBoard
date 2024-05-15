import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { FaSearchDollar, FaPlus, FaHome } from "react-icons/fa";
import { RiInboxArchiveFill } from "react-icons/ri";
import "../App.css";
import { FcBriefcase } from "react-icons/fc";
import OutsideClickHandler from "react-outside-click-handler";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Home", icon: <FaHome /> },
    { path: "/search-jobs", title: "Search", icon: <FaSearchDollar /> },
    { path: "/my-jobs", title: "Posted Jobs", icon: <RiInboxArchiveFill /> },
    { path: "/post-a-job", title: "Post a Job", icon: <FaPlus /> },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <FcBriefcase />
          Work<span className="text-blue">Wave</span>
        </Link>

        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          <Link
            to="/login"
            style={{
              boxShadow: "8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff",
            }}
            className=" py-2 px-8 md:rounded-s-none rounded hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            Job Seeker
          </Link>

          <Link
            to="/company-login"
            style={{
              boxShadow: "8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff",
            }}
            className="bg-blue py-2 px-8 text-white md:rounded-s-none rounded hover:bg-blue-700 transition-all duration-200 transform hover:scale-125"
          >
            Recruiter
          </Link>
        </div>

        <div className="md:hidden block">
          <button onClick={handleMenuOpen}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>
      <OutsideClickHandler onOutsideClick={() => setIsMenuOpen(false)}>
        <div
          className={`px-4 py-5 rounded-md ${
            isMenuOpen ? "bg-white" : "hidden"
          }`}
          style={{
            boxShadow:
              "0px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(255, 255, 255, 0.5)",
          }}
        >
          <ul>
            {navItems.map(({ path, title, icon }) => (
              <li
                key={path}
                className="flex text-lg text-gray-800 font-medium mb-2"
              >
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <div className="flex items-center">
                    {icon}
                    <span className="ml-2">{title}</span>
                  </div>
                </NavLink>
              </li>
            ))}
            <li className="text-lg mb-2">
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        </div>
      </OutsideClickHandler>
    </header>
  );
};

export default Navbar;
