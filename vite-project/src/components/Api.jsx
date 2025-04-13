import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../store/store";

const Api = () => {
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const {user} =useAuth();
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
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer"
            >
              Save & Continue
            </button>
          </form>
        </div>
    </div>
  );
}

export default Api;