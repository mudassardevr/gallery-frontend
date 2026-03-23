import React, { useState } from "react";

function Settings() {
  const [name, setName] = useState("Mudassar");
  const [email, setEmail] = useState("mudassar@gmail.com");
  const [password, setPassword] = useState("");

  const handleUpdate = () => {
    console.log({ name, email, password });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div className="p-4 max-w-md mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      {/* Name */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full mb-3 p-2 rounded bg-gray-800"
      />

      {/* Email */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full mb-3 p-2 rounded bg-gray-800"
      />

      {/* Password */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
        className="w-full mb-4 p-2 rounded bg-gray-800"
      />

      {/* Update */}
      <button
        onClick={handleUpdate}
        className="w-full bg-blue-500 py-2 rounded mb-3"
      >
        Update Profile
      </button>

      {/* Logout */}
      <button onClick={handleLogout} className="w-full bg-red-500 py-2 rounded">
        Logout
      </button>
    </div>
  );
}

export default Settings;
