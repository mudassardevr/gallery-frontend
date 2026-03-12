import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';


function Profile() {
  const {setInLoggedIn} =useContext(AuthContext)

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setInLoggedIn(false)
    navigate("/login");
  }

  return (
    <div>
      <h1>Profile</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
   
  )
}

export default Profile

