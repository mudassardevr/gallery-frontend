import React, { useState } from "react";

function ImageCard({ src, onClick }) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="relative w-full aspect-square bg-gray-200 rounded-md overflow-hidden ">
        {/* SKELETON LOADING */}
        {loading && (
          <div className="absolute inset-0 animate-pulse bg-gray-300"></div>
        )}

        <img
          src={src}
          loading="lazy"
          onClick={onClick}
          decoding="async"
          onLoad={() => setLoading(false)}
          onError={(e) => (e.target.src = "/fallback.png")}
          className={`w-full h-full object-cover transition duration-500 ${ loading ? "opacity-0 scale-105 blur-sm" : "opacity-100 scale-100 blur-0"}`}
        />
      </div>
    </>
  );
}

export default ImageCard;
