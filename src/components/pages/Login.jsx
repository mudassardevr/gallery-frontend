import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mLogo from "../../assets/M-logo.svg";
import googleLogo from "../../assets/google.svg";
import QRlogo from "../../assets/qr.svg";
import eyeIcon from "../../assets/eye.svg";
import { loginAPI } from "../../Services/authService";
import { AuthContext } from "../../context/AuthContext"
import { LoadingContext } from "../../context/LoadingContext";

function Login() {
  const {setIsLoggedIn} = useContext(AuthContext);///useContext
  const { setLoading } = useContext(LoadingContext)

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {

    setLoading(true) // loading start
    try {
      
   
    const data = await loginAPI(credentials);
    console.log("LOGIN RESPONSE:", data);

    if (data.success) {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true)
      navigate("/");
    } else {
      alert(data.error);
    }
     } catch (error) {
       console.error(error);
    alert("Server error");
      
    } finally{
      setLoading(false)

    }

    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        {/*  Sign Up Button (Top Left) */}
        <div className="absolute top-6 left-6 z-20 ">
          <Link
            to="/register"
            className="bg-white px-5 py-2 rounded-md shadow-md font-semibold hover:bg-gray-100 transition"
          >
            Sign up
          </Link>
        </div>
        {/* login-card */}
        <div className="relative z-10 min-h-screen flex justify-center items-center px-4">
          <div className="bg-white w-full max-w-sm p-8 rounded-2xl ">
            {/* login */}
            <div className="flex justify-center items-center mb-4">
              <div className="w-10 h-10 rounded-3xl flex justify-center items-center">
                <img src={mLogo} alt="pinterest" />
              </div>
            </div>

            {/* title */}
            <h1 className="text-center font-bold text-2xl">
              Log in to see more
            </h1>

            {/* form */}
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="text-black pl-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleOnChange}
                  className="w-full border border-gray-500 text-xl rounded-2xl p-3 mt-1 focus:outline-blue-700"
                />
              </div>

              <div className="mt-4">
                <label className="text-black p-2">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleOnChange}
                    className="w-full border border-gray-500 text-xl rounded-2xl p-3 mt-1 focus:outline-blue-700"
                  />
                  <span className="absolute right-3 top-5 text-gray-500">
                    <img src={eyeIcon} className="w-5 h-5" />
                  </span>
                </div>
              </div>

              <Link
                to="/forgot-password"
                className="text-blue-800 font-semibold hover:underline text-sm"
              >
                Forgot Your Password?
              </Link>

              <button
              type="button"
                onClick={handleLogin}
                className="w-full bg-[#e60023] p-2 rounded-xl text-white hover:bg-[#b60101] duration-400"
              >
                Log In
              </button>

              <div className="text-center font-bold">OR</div>

              {/* Social-buttons */}

              <button className="w-full border border-gray-300 p-2 rounded-sm flex items-center justify-center gap-4  hover:bg-gray-200 duration-400">
                <img
                  src={googleLogo}
                  alt="google-logo"
                  className="w-5 h-5 flex items-center"
                />
                <span>Continue with Google</span>
              </button>
              <button className="w-full border border-gray-300 p-2 rounded-sm flex items-center justify-center gap-4  hover:bg-gray-200 duration-400">
                <img src={QRlogo} alt="google-logo" className="w-5 h-5" />
                <span>Use QR Code</span>
              </button>
            </form>

            <p className="text-[11px] text-gray-400 text-center mt-5 px-8 leading-5">
              By continuing, you agree to
              <a href="#" className="text-gray-600 hover:underline">
                {" "}
                Gallery's App Terms of Service{" "}
              </a>
              and acknowledge you've read our
              <a href="#" className="text-gray-600 hover:underline">
                {" "}
                Privacy Policy
              </a>
              .
              <a href="#" className="text-gray-600 hover:underline">
                {" "}
                Notice at collection.
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
