import React, { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/Firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../store/store";
import { ClipLoader } from 'react-spinners';

const Login = () => {
  // const [user, setUser] = useState(null);
  // const [isLogin, setIsLogin] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const { setUser, setIsLogin, isLogin, user } = useAuth();
  const [loading, setloading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();


  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("user", JSON.stringify(user.uid));

      const userDetails = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
        phone: user.phoneNumber,
        emailVerified: user.emailVerified
      };

      setUser(userDetails);
      console.log("user", userDetails);
      setIsLogin(true);
      setShow(true);
      toast.success("Login Successful");
      console.log("isLogin:", show);
      navigate("/api");

    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (

    <div className="flex h-screen">
      {/* Left Image Section */}
      <div className="flex-col justify-center items-center w-1/2  hidden md:flex">
        <img
          src="/Home.png"
          alt="QuickCrypt"
          className="w-120 h-120 object-cover"
        />
      </div>

      {/* Right Login Section */}

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
        <h2 className="text-4xl font-bold mb-6">Welcome to QuickCrypt!</h2>
        <p className="text-gray-600 mb-4 text-center">
          Sign in to continue to your account
        </p>
        <button
          onClick={handleGoogleSignIn}
          className="bg-white text-gray-700 border border-gray-300 rounded-md px-6 py-3 flex items-center gap-3 shadow hover:shadow-lg transition cursor-pointer"
        >
          <FcGoogle size={22} />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </div>


    </div>
  );
}

export default Login;