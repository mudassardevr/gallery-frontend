const API_URL = "https://gallery-backend-sgma.onrender.com/api/images";

//FRONTEND TO BACKEND CONNECT images.js
//UPLOAD IMAGE API
export const uploadImageAPI = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: {
      "auth-token": localStorage.getItem("token"),
    },
    body: formData,
  });

  return response.json();
};

//FETCH IMAGES
export const fetchImagesAPI = async () => {

//     if (Array.isArray(data)) {
//     setImages(data);
//   } else {
//     console.log("Auth Error:", data);
//     setImages([]);  // prevents crash
//   }
  
  const response = await fetch(`${API_URL}/my-images`, {
    method: "GET",
    headers: {
      "auth-token": localStorage.getItem("token"),
    },
  });
  return response.json();
};

//DELETE API
export const deleteImageAPI = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "auth-token": localStorage.getItem("token"),
    },
  });
  return response.json();
};
