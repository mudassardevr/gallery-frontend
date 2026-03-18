import React, { useEffect, useState, useRef } from "react";
import plusIcon from "../../assets/plus.svg";
import photoIcon from "../../assets/photo-icon.svg";
import { useOutletContext } from "react-router-dom";
import {
  uploadImageAPI,
  fetchImagesAPI,
  deleteImageAPI,
} from "../../Services/imageService";
import ImageCard from "../common/ImageCard";
import { toast } from "react-toastify";
import DeleteModal from "../common/DeleteModal";

function Gallery() {
  // const location = useLocation();
  const [image, setImage] = useState([]);
  const [file, setFile] = useState(null);
  const [viewerIndex, setViewerIndex] = useState(null); // touch image on fullscreen
  const [uploading, setUploading] = useState(false); // plus button loading when image adding
  // const [deletingId, setDeletingId] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  // const [selectedId, setSelectedId] = useState(null);

  const { activeId, setActiveId, handleDeleteClick , refresh } =
    useOutletContext(); // THIS IS FOR LONG PRESS DELETE
  let pressTimer = useRef(null);

    // ✅ fetch images
  const fetchImages = async () => {
    try {
      const data = await fetchImagesAPI();
      setImage(data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [refresh]);

  const handleUploadImage = async () => {
    await uploadImageAPI(file);
    fetchImages();
  };

  // ✅ upload image
  const handleOnChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setUploading(true);
    try {
      await uploadImageAPI(selectedFile);
      await fetchImages();
    } catch (error) {
      toast.error("Adding Failed");
    } finally {
      setUploading(false);
    }
  };

  // Delete image / hold to show delete icon
  const handleTouchStart = (id) => {
    pressTimer.current = setTimeout(() => {
      setActiveId(id); //Show delete
    }, 600); //600 ms long press
  };

  const handleTouchEnd = () => {
    clearTimeout(pressTimer.current);
  };

  // touch image fullscreen
  const viewerImage = viewerIndex !== null ? image[viewerIndex].imageUrl : null;

  // Swipt image left/Right
  const touchStartX = useRef(null);

  const handleTouchStartViewer = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEndViewer = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50 && viewerIndex < image.length - 1) {
      setViewerIndex(viewerIndex + 1); // swipe left
    }

    if (diff < -50 && viewerIndex > 0) {
      setViewerIndex(viewerIndex - 1); // swipe right → previous
    }

    //infinite swipe
    // if (diff > 50) {
    //   setViewerIndex((prev) => (prev + 1) % image.length);
    // }

    // if (diff < -50) {
    //   setViewerIndex((prev) => (prev - 1 + image.length) % image.length);
    // }
  };

  // const handleDelete = async () => {
  //   try {
  //     setDeletingId(selectedId);

  //     await deleteImageAPI(selectedId);
  //     await fetchImages();
  //     toast.success("Image deleted");
  //   } catch (error) {
  //     toast.error("Delete failed");
  //   } finally {
  //     setDeletingId(null);
  //     setShowModal(false);
  //     setActiveId(null); // hide delete button after action
  //   }
  // };

  return (
    <>
      <div onClick={() =>  setActiveId(null)}> 
        {/* Cards */}
        <div className="p-2">
          {image.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
              <img src={photoIcon} className="w-12 h-12 opacity-50 mb-3" />
              <p className="text-lg font-semibold">Your gallery is empty</p>
              <p className="text-sm">Upload your first memory </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {image.map((img, index) => (
                <div
                  key={img._id}
                  className="relative group transition-all duration-300"
                  // className={`relative group transition duration-300 ${
                  //   deletingId === img._id ? "opacity-0 scale-95" : ""
                  // }`}
                  onTouchStart={() => handleTouchStart(img._id)}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={() => handleTouchStart(img._id)}
                  onMouseUp={handleTouchEnd}
                  onMouseLeave={handleTouchEnd}
                >
                  <ImageCard
                    src={img.imageUrl}
                    onClick={() => setViewerIndex(index)}
                    //className="relative w-full aspect-square overflow-hidden"
                  />
                  {activeId === img._id && (
                    <button
                      onClick={() => handleDeleteClick(img._id)}
                      // disabled={deletingId === img._id}
                      className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded transition-all duration-300 ease-in-out"
                    >
                      {/* {deletingId === img._id ? (
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        "Delete"
                      )} */}
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {viewerImage && (
          <div
            onClick={() => setViewerIndex(null)}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onTouchStart={handleTouchStartViewer}
            onTouchEnd={handleTouchEndViewer}
          >
            <img
              src={viewerImage}
              alt="1"
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90%] max-h-[90%] object-contain"
            />
          </div>
        )}

        {/* hidden file input */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="fileInput"
          onChange={handleOnChange}
        />

        {/* pluse button */}
        <label
          htmlFor={!uploading ? "fileInput" : ""}
          className="bg-[#e60023] text-3xl text-white flex justify-center items-center w-10 h-10 rounded-full fixed bottom-24 right-6 shadow-2xl active:scale-95"
        >
          {uploading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <img src={plusIcon} className="w-4 h-4" />
          )}
        </label>
      </div>
    {/* // deleting modal
      <DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      /> */}
    </>
  );
}

export default Gallery;
