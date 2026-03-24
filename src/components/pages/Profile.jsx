import React, { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../../Services/authService";
import { toast } from "react-toastify";

function Profile() {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null); // for upload

  // Fetch user
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const data = await getUserProfile();
      console.log("USER DATA:", data); // debug once
    setUser(data);
    setName(data.name);
    setImage(data.profileImage || ""); // FIX
  };

  // Handle Image (preview + store file)
  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setImage(previewUrl);
    }
  };

  // Update Profile
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);

      if (file) {
        formData.append("profileImage", file);
      }

      const updated = await updateProfile(formData);

      setUser(updated);
      setImage(updated.profileImage); // cloudinary image
      toast.success("Profile Updated");
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  //for logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <img
              src={image || "https://via.placeholder.com/120"}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
            />

            <input
              type="file"
              onChange={handleImage}
              className="mt-3 text-sm"
            />
          </div>

          {/* User Info */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-500">{user.email}</p>

            {/* Stats (static for now) */}
            <div className="flex justify-center md:justify-start gap-6 mt-4">
              <div>
                <h3 className="font-semibold text-lg">0</h3>
                <p className="text-sm text-gray-500">Photos</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">0</h3>
                <p className="text-sm text-gray-500">Albums</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6" />

        {/* Name Edit */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    // <>
    //   <div className="min-h-screen bg-gray-100 p-4 md:p-8">
    //     {/* Container */}
    //     <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
    //       {/* Top Section */}
    //       <div className="flex flex-col md:flex-row items-center gap-6">
    //         {/* Profile Image */}
    //         <img
    //           src={image || "https://via.placeholder.com/120"}
    //           alt="profile"
    //           className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
    //         />

    //         {/* User Info */}
    //         <div className="text-center md:text-left">
    //           <h2 className="text-2xl font-bold text-gray-800">Mudassar Dev</h2>
    //           <p className="text-gray-500">mudassar@example.com</p>

    //           {/* Stats */}
    //           <div className="flex justify-center md:justify-start gap-6 mt-4">
    //             <div>
    //               <h3 className="font-semibold text-lg">120</h3>
    //               <p className="text-sm text-gray-500">Photos</p>
    //             </div>
    //             <div>
    //               <h3 className="font-semibold text-lg">15</h3>
    //               <p className="text-sm text-gray-500">Albums</p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Divider */}
    //       <hr className="my-6" />

    //       {/* Actions */}
    //       <div className="flex flex-col md:flex-row gap-4 justify-between">
    //         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
    //           Edit Profile
    //         </button>

    //         <button
    //           onClick={handleLogout}
    //           className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
    //         >
    //           Logout
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}

export default Profile;
