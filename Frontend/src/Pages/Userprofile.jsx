import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const UserProfile = () => {
  /*const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);*/

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-blue text-xl">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-blue text-xl">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-[#FAFAFA] lg:px-24 px-4 py-12">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-8">
            <h1 className="text-blue font-bold text-4xl mb-2">User Profile</h1>
          </div>
          <div className="flex flex-col md:flex-row items-center mb-8 gap-7">
            <div className="md:w-1/3 w-full flex flex-col items-center">
              <img
                src="/path/to/default-profile-picture.jpg"
                alt={`${user.name} profile`}
                className="w-56 h-56 object-cover rounded-full mb-4"
              />
              <a
                href={`http://localhost:3000/${user.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue text-white py-2 px-4 rounded-md hover:bg-black"
              >
                View Resume
              </a>
            </div>
            <div className="md:w-2/3 w-full">
              <h2 className="text-gray-700 text-2xl mb-1">{user.name}</h2>
              <p className="text-gray-600 mb-1">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Type:</strong> {user.type}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Joined:</strong>{" "}
                {new Date(user.createAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
