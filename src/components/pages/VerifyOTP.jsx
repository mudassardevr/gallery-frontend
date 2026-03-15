import React, { useState, useRef, useContext , useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { forgotPasswordAPI, verifyOtpAPI } from "../../Services/authService";
import { toast } from "react-toastify";
import { LoadingContext } from "../../context/LoadingContext";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, setLoading } = useContext(LoadingContext);

  const email = location.state?.email;
useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Enter complete OTP");
      return;
    }

    setLoading(true);
    try {
      const data = await verifyOtpAPI(email, otpValue);

      if (data.success) {
        toast.success("OTP verified");
        navigate("/reset-password", { state: { email } });
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  /// resend OTP
  const handleResendOtp = async () => {
    try {
      const data = await forgotPasswordAPI(email);

      if (data.success) {
        toast.success("New OTP sent to your email 📩");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>

        <p className="text-gray-500 mb-6">
          Enter the 6-digit OTP sent to your email
        </p>

        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 border text-center text-xl rounded"
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-red-500 text-white p-3 rounded"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* RESEND OTP */}
        <p className="text-sm text-gray-500 mt-4">
        Didn't receive the code?{" "}
        <span
          onClick={handleResendOtp}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Resend OTP
        </span>
      </p>
      </div>

      
    </div>
  );
}

export default VerifyOTP;
