import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import BottomNav from "../ui/BottomNav";
import { deleteImageAPI } from "../../Services/imageService";
import DeleteModal from "../common/DeleteModal";


function MainLayout() {
  const [activeId, setActiveId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
  setSelectedId(id);
  setShowModal(true);
};

const handleConfirmDelete = async () => {
  try {
    await deleteImageAPI(selectedId);
    setRefresh(prev => !prev);
  } finally {
    setShowModal(false);
    setSelectedId(null);
    setActiveId(null);
  }
};
  // const handleDeleteImage = async (id) => {
  //   await deleteImageAPI(id);
  //   setActiveId(null);

  //   setRefresh((prev) => !prev);
  // };

  return (
    <>
     <DeleteModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onConfirm={handleConfirmDelete}
/>
   
    <div className="min-h-screen  bg-linear-to-r from-[#EEAECA] to-[#94BBE9] ">
      <Navbar activeId={activeId} handleDeleteClick={handleDeleteClick} />

      {/* Page component */}
      <div className="pb-24">
        <Outlet
          context={{ activeId, setActiveId, handleDeleteClick, refresh }}
        />
      </div>

      <BottomNav />
    </div>
     </>
  );
}

export default MainLayout;
