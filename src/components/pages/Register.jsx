import React, { useState, useContext } from "react";
import pinterestLogo from "../../assets/pinterest-logo.svg";
import googleLogo from "../../assets/google.svg";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../../Services/authService";
import { AuthContext } from "../../context/AuthContext";
import { LoadingContext } from "../../context/LoadingContext";
import { toast } from "react-toastify";


function Register() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext)


  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (credentials.password !== credentials.confirmPassword) {
      return alert("password do not match");
    }
    setLoading(true);//loading start
    try {

      const data = await registerAPI(credentials);
  
      if (data.success) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        navigate("/");
        toast.success("Registration Successful")//toast
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Register Error:", error);
      toast.error("Server Error");
    } finally{
      setLoading(false); //loading end
    }
  };

  return (
    <>
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
          }}
        ></div>{" "}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>{" "}
        {/*  Login Button (Top Left) */}
        <div className="absolute top-6 left-6 z-20 ">
          <Link
            to="/login"
            className="bg-white px-5 py-2 rounded-md shadow-md font-semibold hover:bg-gray-100 transition"
          >
            Log In
          </Link>
        </div>
        <div className="relative min-h-screen flex justify-center items-center">
          {/* Register card */}
          <div className="bg-white w-full p-8 max-w-sm rounded-2xl">
            <div className="flex justify-center items-center mb-5">
              <img src={pinterestLogo} alt="pinterest" className="w-10 h-10" />
            </div>

            <div className="text-center text-3xl font-bold mb-5">
              Sign up to see more
              <p className="text-sm mt-2">Discovery starts here</p>
            </div>

            {/* Social button  step === 1*/}
            {/* STEP ===1 */}
            {step === 1 && (
              <div className="space-y-4">
                <button
                  onClick={() => setStep(2)}
                  className="bg-[#e60023] w-full p-3 text-white text-xl rounded-2xl hover:bg-[#b60101] duration-400"
                >
                  Continue with email
                </button>
                <button className="bg-white border border-gray-300 w-full p-3 text-white text-xl rounded-2xl flex justify-center items-center gap-4 hover:bg-gray-200 duration-400">
                  <img src={googleLogo} alt="google" className="w-5 h-5" />
                  <span className="text-black">Continue with Google</span>
                </button>
              </div>
            )}

            {/* STEP === 2 */}
            {step === 2 && (
              <div>
                <div className="mb-5">
                  <label className="px-2">Name</label>
                  <input
                    name="name"
                    value={credentials.name}
                    onChange={handleOnChange}
                    type="text"
                    placeholder="Enter Name"
                    className="w-full border border-black p-4 rounded-2xl focus:outline-blue-700"
                  />
                </div>
                <div className="mb-5">
                  <label className="px-2">Email</label>
                  <input
                    name="email"
                    value={credentials.email}
                    onChange={handleOnChange}
                    type="email"
                    placeholder="Email"
                    className="w-full border border-black p-4 rounded-2xl focus:outline-blue-700"
                  />
                </div>
                <div>
                  <label className="px-2">Password</label>
                  <input
                    name="password"
                    value={credentials.password}
                    onChange={handleOnChange}
                    type="password"
                    placeholder="Create a Password"
                    className="w-full border border-black p-4 rounded-2xl focus:outline-blue-700"
                  />
                </div>
                <div className="mt-4">
                  <label className="px-2">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    value={credentials.confirmPassword}
                    onChange={handleOnChange}
                    type="password"
                    placeholder="confirm Password"
                    className="w-full border border-black p-4 rounded-2xl focus:outline-blue-700"
                  />
                </div>

                <p className="text-sm text-center my-4">
                  Use 8 or more letters, numbers and symbols
                </p>

                <button
                  onClick={handleRegister}
                  className="mt-4 w-full bg-[#e60023] p-2 rounded-xl text-white hover:bg-[#b60101] duration-400"
                >
                  Sign up
                </button>
              </div>
            )}

            {/* footer */}
            <div className="mt-6 w-full text-center">
              <p className="text-[11px] text-gray-500 leading-4 px-6">
                By continuing, you agree to Imagebash's{" "}
                <span className="font-semibold text-black hover:underline cursor-pointer">
                  Terms of Service
                </span>{" "}
                and acknowledge you've read our{" "}
                <span className="font-semibold text-black hover:underline cursor-pointer">
                  Privacy Policy
                </span>
                .{" "}
                <span className="font-semibold text-black hover:underline cursor-pointer">
                  Notice at collection
                </span>
                .
              </p>

              <p className="mt-5 text-[14px] text-gray-700">
                Already a member?{" "}
                <Link
                type="button"
                  to="/login"
                  className="font-semibold text-black hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
