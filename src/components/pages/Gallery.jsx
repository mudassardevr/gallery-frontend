import React, { useEffect, useState, useRef } from "react";
import plusIcon from "../../assets/plus.svg";
import photoIcon from "../../assets/photo-icon.svg";
import { useOutletContext } from "react-router-dom";
import { uploadImageAPI, fetchImagesAPI } from "../../Services/imageService";
import ImageCard from "../common/ImageCard";
import { toast } from "react-toastify";
import cameraIcon from "../../assets/camera-icon.svg";

function Gallery() {
  // const location = useLocation();
  const [image, setImage] = useState([]);
  const [file, setFile] = useState(null);
  const [viewerIndex, setViewerIndex] = useState(null); // touch image on fullscreen
  const [uploading, setUploading] = useState(false); // plus button loading when image adding
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  //FOR CAMERA
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { activeId, setActiveId, handleDeleteClick, refresh } =
    useOutletContext(); // THIS IS FOR LONG PRESS DELETE
  let pressTimer = useRef(null);

  // fetch images
  const fetchImages = async () => {
    try {
      setLoading(true);

      const data = await fetchImagesAPI();

      if (Array.isArray(data)) {
        setImage(data);
      } else {
        toast.error("Invalid data");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [refresh]);

  const handleUploadImage = async () => {
    await uploadImageAPI(file);
    fetchImages();
  };

  // upload image
  const handleOnChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setUploading(true);
    try {
      await uploadImageAPI(selectedFile);
      fetchImages();
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
  };

  /// START CAMERA
  useEffect(() => {
    if (!cameraOpen) return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera not supported on this device/browser");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Camera permission denied or error");
      });
  }, [cameraOpen]);

  //CAPUTRE PHOTO
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");

    setCapturedImage(imageData); // store image

    closeCamera();
  };

  // CLOSE CAMERA
  const closeCamera = () => {
    setCameraOpen(false);

    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const uploadCapturedImage = async () => {
    try {
      setUploading(true);

      // convert base64 -> file
      const file = await fetch(capturedImage).then((res) => res.blob());

      // use your service
      await uploadImageAPI(file);

      await fetchImages();

      toast.success("Image uploaded");
      setCapturedImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div onClick={() => setActiveId(null)} className="pb-32">
        {/* Cards */}
        <div className="p-2">
          {loading ? (
            <div className="flex justify-center items-center h-[60vh] flex-col">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 text-sm">Loading images...</p>
            </div>
          ) : image.length === 0 ? (
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
                  onTouchStart={() => handleTouchStart(img._id)}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={() => handleTouchStart(img._id)}
                  onMouseUp={handleTouchEnd}
                  onMouseLeave={handleTouchEnd}
                >
                  <ImageCard
                    src={img.imageUrl}
                    onClick={() => setViewerIndex(index)}
                   
                  />
                  {activeId === img._id && (
                    <button
                      onClick={() => handleDeleteClick(img._id)}
                      className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded transition-all duration-300 ease-in-out"
                    >
      
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {viewerIndex !== null && ( // changed condition
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center overflow-hidden z-50"
            onClick={() => setViewerIndex(null)}
            onTouchStart={handleTouchStartViewer}
            onTouchEnd={handleTouchEndViewer}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setViewerIndex(null)}
              className="absolute top-4 right-4 text-white text-2xl z-50"
            >
              ✕
            </button>

            {/*  SLIDER CONTAINER */}
            <div
              className="flex transition-transform duration-300 ease-in-out" // smooth animation
              style={{
                transform: `translateX(-${viewerIndex * 100}%)`, //  slide logic
                width: `${image.length * 100}%`, //  full width for all images
              }}
            >
              {image.map((img, i) => (
                <div
                  key={i}
                  className="w-full flex justify-center items-center shrink-0" //  fixed width
                >
                  <img
                    src={img.imageUrl}
                    alt="gallery"
                    onClick={(e) => e.stopPropagation()}
                    className="max-w-[90%] max-h-[90%] object-contain"
                  />
                </div>
              ))}
            </div>
            {/* left button for pc */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent close
                if (viewerIndex > 0) setViewerIndex(viewerIndex - 1);
              }}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white text-2xl px-3 py-2 rounded-full"
            >
              ‹
            </button>
            {/* right button for pc */}
            <button
              onClick={(e) => {
                e.stopPropagation(); //prevent close
                if (viewerIndex < image.length - 1)
                  setViewerIndex(viewerIndex + 1);
              }}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white text-2xl px-3 py-2 rounded-full"
            >
              ›
            </button>
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

        {/*  Floating Add Post Button (ONLY HERE) */}
        <div className="fixed bottom-28 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={() => setCameraOpen(true)}
            className="flex items-center bg-blue-500 gap-2 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg transition"
          >
            <img src={cameraIcon} className="w-5 h-5" />
            <span>Add Photos</span>
          </button>
        </div>

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

      {/* camera open and capture image */}
      {cameraOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
          {/* Video Preview */}
          <video
            ref={videoRef}
            autoPlay
            className="w-full max-w-sm rounded scale-x-[-1] "
          />

          {/* Buttons */}
          <div className="mt-4 flex gap-4">
            <button
              onClick={capturePhoto}
              className="bg-green-500 px-4 py-2 rounded"
            >
              Capture
            </button>

            <button
              onClick={closeCamera}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {/* upload captured image */}

      {capturedImage && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
          <img
            src={capturedImage}
            className="max-w-[90%] max-h-[70%] rounded"
          />

          <div className="flex gap-4 mt-4">
            <button
              onClick={uploadCapturedImage}
              disabled={uploading}
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              {uploading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Upload"
              )}
            </button>

            <button
              onClick={() => setCapturedImage(null)}
              className="bg-gray-500 px-4 py-2 rounded text-white"
            >
              Retake
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;
