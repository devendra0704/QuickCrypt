import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/Firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../store/store";

const Login = () => {
  // const [user, setUser] = useState(null);
  // const [isLogin, setIsLogin] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const { setUser, setIsLogin, isLogin,user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/save-keys`,
        {
          uid: user.uid,
          apiKey,
          secretKey,
        }
      );
      console.log("res....." ,res);
      toast.success("Keys saved!");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to save keys");
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

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
      console.log("user", userDetails);
      setIsLogin(true);
      toast.success("Login Successful");
      // navigate("/");

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
      {!isLogin && (
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
      )}

      {isLogin && (
        <div className="w-full max-w-sm flex flex-col justify-center items-center m-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">Enter CoinDCX Credentials</h3>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
              placeholder="API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
              className="w-full border px-4 py-2 mb-3 rounded-md"
            />
            <input
              type="password"
              placeholder="Secret Key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              required
              className="w-full border px-4 py-2 mb-3 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Save & Continue
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;