import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/store";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/Firebase";

const Navbar = () => {
    const { user, setUser, setIsLogin } = useAuth();

    const navigate = useNavigate();
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
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white">
            <div className="max-w-full mx-auto px-25 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="text-3xl font-bold text-White cursor-pointer" onClick={() => navigate("/")}>
                    QuickCrypt
                </div>
                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6 text-black">
                    <Link to="/home" className="hover:text-gray-400 font-semibold">Home</Link>
                    <Link to="/trade" className="hover:text-gray-400 font-semibold">Trade</Link>
                    <Link to="/market" className="hover:text-gray-400 font-semibold">Market</Link>

                </div>
                {/* Login/Logout Button */}
                <div className="hidden md:flex">
                    {user ? (
                        <div>
                            <Link to="/profile" className="hover:text-gray-300 px-5 font-semibold">Dashboard</Link>
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;