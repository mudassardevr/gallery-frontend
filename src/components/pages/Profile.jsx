import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';


function Profile() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
 
  return (
    <>
     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      
      {/* Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          {/* Profile Image */}
          <img
            src="https://via.placeholder.com/120"
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
          />

          {/* User Info */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              Mudassar Dev
            </h2>
            <p className="text-gray-500">
              mudassar@example.com
            </p>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-6 mt-4">
              <div>
                <h3 className="font-semibold text-lg">120</h3>
                <p className="text-sm text-gray-500">Photos</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">15</h3>
                <p className="text-sm text-gray-500">Albums</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6" />

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Edit Profile
          </button>

          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>

      </div>
    </div>

    </>
   
  )
}

export default Profile

