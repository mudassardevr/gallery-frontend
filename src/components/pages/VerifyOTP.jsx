import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtpAPI } from "../../Services/authService";

function VerifyOTP() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

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
      alert("Enter complete OTP");
      return;
    }

    const data = await verifyOtpAPI(email, otpValue);

    if (data.success) {

      alert("OTP verified");

      navigate("/reset-password", { state: { email } });

    } else {
      alert(data.error);
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-96 text-center">

        <h2 className="text-2xl font-bold mb-4">
          Verify OTP
        </h2>

        <p className="text-gray-500 mb-6">
          Enter the 6-digit OTP sent to your email
        </p>

        <div className="flex justify-between mb-6">

          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => inputs.current[index] = el}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 border text-center text-xl rounded"
            />
          ))}

        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 text-white p-3 rounded"
        >
          Verify OTP
        </button>

      </div>

    </div>
  );
}

export default VerifyOTP;