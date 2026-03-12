import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import BottomNav from "../ui/BottomNav";
import { deleteImageAPI } from "../../Services/imageService";

function MainLayout() {

  const [activeId, setActiveId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleDeleteImage = async (id) => {
    await deleteImageAPI(id);
    setActiveId(null);

    setRefresh(prev => !prev)
  };

  return (
    <div className="min-h-screen  bg-linear-to-r from-[#EEAECA] to-[#94BBE9] ">
      <Navbar activeId={activeId} handleDeleteImage={handleDeleteImage} />

      {/* Page component */}
      <div className="pb-24">
        <Outlet context={{ activeId, setActiveId, handleDeleteImage , refresh}} />
      </div>

      <BottomNav />
    </div>
  );
}

export default MainLayout;
