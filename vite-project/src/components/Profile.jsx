import React, { useState } from "react";
import { Copy, Mail, User, KeyRound, Wallet, LogOut } from "lucide-react";
import { useAuth } from "../store/store.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const Profile = () => {
    const { user, setUser, setIsLogin } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("profile");

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setIsLogin(false);
            navigate("/");
        } catch (error) {
            console.error("Logout Error:", error.message);
        }
    };


    const renderTabContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <div className="text-center h-50 flex flex-col items-center justify-center space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <User className="w-5 h-5" /> {user.name}
                        </h2>
                        <p className="text-gray-600 flex items-center gap-2">
                            <Mail className="w-5 h-5" /> {user.email}
                        </p>
                    </div>
                );
            case "credentials":
                return (
                    <div className="bg-gray-50 p-4 rounded-lg shadow space-y-3">
                        <h3 className="font-semibold text-gray-700 mb-2">Credentials</h3>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2 text-sm text-gray-800">
                                <KeyRound className="w-4 h-4" />
                                API Key:
                                <span className="font-mono">{user.apiKey}</span>
                            </span>
                            <button
                                onClick={() => copyToClipboard(user.apiKey)}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2 text-sm text-gray-800">
                                <KeyRound className="w-4 h-4" />
                                Secret Key:
                                <span className="font-mono">{user.secretKey}</span>
                            </span>
                            <button
                                onClick={() => copyToClipboard(user.secretKey)}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                );
            case "wallet":
                return (
                    <div className="bg-blue-100 text-blue-800 p-4 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Wallet className="w-5 h-5" />
                            <span className="text-lg font-semibold">Wallet Balance</span>
                        </div>
                        <span className="text-xl font-bold">₹{user.balance}</span>
                    </div>
                );
            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <div className="min-h-screen flex pt-16 bg-gray-50">    
          <Navbar />
        {/* Sidebar */}
        <div className="w-84 bg-white shadow-lg p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div
              className={`cursor-pointer p-2 rounded ${
                activeTab === "profile" ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              My Profile
            </div>
            <div
              className={`cursor-pointer p-2 rounded ${
                activeTab === "credentials" ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700"
              }`}
              onClick={() => setActiveTab("credentials")}
            >
              Credentials
            </div>
            <div
              className={`cursor-pointer p-2 rounded ${
                activeTab === "wallet" ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700"
              }`}
              onClick={() => setActiveTab("wallet")}
            >
              Wallet
            </div>
          </div>
  
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-8 flex items-center gap-2 justify-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
  
        {/* Content */}
        <div className="flex-1 p-8 bg-gray-100">
          <div className="bg-white rounded-xl shadow p-6 space-y-6 max-w-4xl mx-auto">
            {renderTabContent()}
          </div>
        </div>
      </div>
  
    );
};

export default Profile;
