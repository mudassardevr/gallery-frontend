import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordAPI } from "../../Services/authService";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await forgotPasswordAPI(email);

      if (data.success) {
        alert("OTP sent to your email");

        navigate("/verify-otp", { state: { email } });

      } else {
        alert(data.error);
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-3 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white p-3 rounded"
          >
            Send OTP
          </button>

        </form>

      </div>

    </div>
  );
}

export default ForgotPassword;