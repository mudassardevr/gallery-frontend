import React from "react";
import deleteIcon from "../../assets/delete-icon.svg"

function Navbar({activeId , handleDeleteImage}) {
  return (
    <div className="p-4 sticky top-0 bg-white/30 backdrop-blur-md shadow-xl flex justify-between items-center z-50">
      <h1 className="flex items-center font-bold ">My Gallery</h1>
      {activeId && (
        <button
              onClick={() => handleDeleteImage(activeId)}
              className="w-5 h-5 md:hidden"
            >
              <img src={deleteIcon} alt="3" />
            </button>
      )}


    </div>
  );
}

export default Navbar;
