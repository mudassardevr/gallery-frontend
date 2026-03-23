import React from 'react'
import { Link, useLocation } from "react-router-dom";
import photoIcon from "../../assets/photo-icon.svg";
import detailsIcon from "../../assets/details-icon.svg";
import settingsIcon from "../../assets/settings-icon.svg";
import profileIcon from "../../assets/profile-icon.svg";

function BottomNav() {

    const location = useLocation();

  return (
    <>
    <div className="bg-white/30 backdrop-blur-md w-fit fixed bottom-7 left-1/2 transform -translate-x-1/2 py-2 rounded-full shadow-2xl">
              <div className="flex justify-center items-center gap-6 px-2">
                <Link
                  // onClick={() => setActiveTab("photos")}
                  to="/"
                  className={`w-16 flex flex-col items-center text-sm rounded-full px-3 py-1 transition duration-300  active:scale-90 ${location.pathname === "/" ? "bg-blue-400 backdrop-blur-md" : ""}`}
                >
                  <img src={photoIcon} className="w-5 h-5" />
                  <span>Photos</span>
                </Link>
                <Link
                  // onClick={() => setActiveTab("camera")}
                  to="/about"
                  className={`w-16 flex flex-col items-center text-sm rounded-full px-3 py-1 transition duration-300  active:scale-90 ${location.pathname === "/about" ? "bg-blue-400 backdrop-blur-md" : ""}`}
                >
                  <img src={detailsIcon} className="w-5 h-5" />
                  <span>About</span>
                </Link>
                <Link
                  // onClick={() => setActiveTab("settings")}
                  to="/settings"
                  className={`w-16 flex flex-col items-center text-sm rounded-full px-3 py-1 transition duration-300  active:scale-90 ${location.pathname === "/settings" ? "bg-blue-400 backdrop-blur-md" : ""}`}
                >
                  <img src={settingsIcon} className="w-5 h-5" />
                  <span>Settings </span>
                </Link>
                <Link
                  // onClick={() => setActiveTab("profile")}
                  to="/profile"
                  className={`w-16 flex flex-col items-center text-sm rounded-full px-3 py-1 transition duration-300   active:scale-90 ${location.pathname === "/profile" ? "bg-blue-400 backdrop-blur-md" : ""}`}
                >
                  <img src={profileIcon} className="w-5 h-5" />
                  <span>profile</span>
                </Link>
              </div>
            </div>
    </>
    
  )
}

export default BottomNav