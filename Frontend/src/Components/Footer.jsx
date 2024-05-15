import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { FaSearchDollar, FaPlus, FaHome } from "react-icons/fa";
import { RiInboxArchiveFill } from "react-icons/ri";

const Footer = () => {
  const navItems = [
    { path: "/", title: "Home", icon: <FaHome /> },
    { path: "/search-jobs", title: "Search", icon: <FaSearchDollar /> },
    { path: "/my-jobs", title: "Posted Jobs", icon: <RiInboxArchiveFill /> },
    { path: "/post-a-job", title: "Post a Job", icon: <FaPlus /> },
  ];

  return (
    <footer className="text-white mp-20 mt-10">
      <div className="overflow-x-hidden -mb-0.5">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            fill: "#3575E2",
            width: "125%",
            height: 112,
            transform: "rotate(180deg)",
          }}
        >
          <path d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z" />
        </svg>
      </div>

      <div className="bg-blue px-6 py-12 lg:px-20 lg:py-20">
        <div className="w-full lg:w-11/12 mx-auto lg:flex justify-between items-center">
          <div className="lg:w-1/2">
            <h1 className="text-2xl font-bold mb-4">
              Important 
              <span className="text-[#001a36] text-3xl font-bold"> Links</span>
            </h1>
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="text-white hover:text-gray-300 flex items-center"
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 mt-6 lg:mt-0">
            <h1 className="text-2xl font-bold mb-4">
              Subscribe to our <span className="text-[#001a36] text-4xl font-bold"> Newsletter</span>
            </h1>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-grow">
                <TextInput
                  styles="w-full bg-gray-100"
                  type="email"
                  placeholder="Email Address"
                />
              </div>
              <CustomButton
                title="Subscribe"
                containerStyles="bg-[#001a36] text-white px-5 py-2.5 text-md rounded hover:bg-blue-800 focus:outline-none flex items-center"
              />
            </div>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-5">
              <h1 className="text-2xl font-bold">
                Connect with our <span className="text-[#001a36]">Socials</span>
              </h1>
              <FaFacebookF className="text-white text-xl hover:scale-125 ease-in-out duration-300" />
              <FaTwitter className="text-white text-xl hover:scale-125 ease-in-out duration-300" />
              <FiInstagram className="text-white text-xl hover:scale-125 ease-in-out duration-300" />
              <FaLinkedinIn className="text-white text-xl hover:scale-125 ease-in-out duration-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#001a36] py-4">
        <div className="container mx-auto flex flex-wrap justify-between">
          <p className="text-gray-300 text-sm">
            &copy; JobBoard —
            <a
              href=""
              className="text-[#1199e7] ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              @workwave
            </a>
          </p>
          <p className="text-gray-300 text-sm">Designed by Team workwave</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
