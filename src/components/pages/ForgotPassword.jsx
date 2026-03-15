import React, { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordAPI } from "../../Services/authService";
import { toast } from "react-toastify";
import { LoadingContext } from "../../context/LoadingContext";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { loading , setLoading } = useContext(LoadingContext)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const data = await forgotPasswordAPI(email);

      if (data.success) {
        toast.success("OTP sent to your email");
        navigate("/verify-otp", { state: { email } });
      } else {
       toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* back button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("/login")}
          className="bg-white px-4 py-2 rounded shadow hover:bg-gray-100"
        >
          ← Back to Login
        </button>
      </div>

      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

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
            disabled={loading}
            className="w-full bg-red-500 text-white p-3 rounded"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
