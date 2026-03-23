import React from "react";
import deleteIcon from "../../assets/delete-icon.svg";
import mLogo from "../../assets/M-logo.svg"

function Navbar({ activeId, handleDeleteClick }) {
  return (
    <div className="p-4 sticky top-0 bg-white/30 backdrop-blur-md shadow-xl flex justify-between items-center z-50">
      <img src={mLogo} alt="m-logo" className="w-5 h-5"/>
      <span className="flex items-center font-bold ">Gallery</span>
      {activeId && (
        <button
          title="Delete selected image"
          onClick={() => handleDeleteClick(activeId)}
          className="w-5 h-5 md:hidden"
        >
          <img src={deleteIcon} alt="delete icon" />
        </button>
      )}
    </div>
  );
}

export default Navbar;
