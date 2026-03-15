import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { LoadingContext } from "./context/LoadingContext";
import Loader from "./components/common/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Gallery from "./components/pages/Gallery";
import Settings from "./components/pages/Settings";
import Profile from "./components/pages/Profile";
import About from "./components/pages/About";
import ForgotPassword from "./components/pages/ForgotPassword";
import VerifyOTP from "./components/pages/VerifyOTP";
import ResetPassword from "./components/pages/ResetPassword";

import MainLayout from "./components/layouts/MainLayout";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";

function App() {
  const { loading } = useContext(LoadingContext);

  return (
    <>
      {/* GLOBAL LOADER */}
      {loading && <Loader />}
      <Routes>
        {/* Layout Wrapper || Protected Route*/}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Pages */}
          <Route index element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Auth Pages || Public Route*/}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <PublicRoute>
              <VerifyOTP />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;
