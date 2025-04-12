import {useEffect, useState } from 'react'
import './App.css'
import TradeForms from './components/TradeForm1'
import Login from './components/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from './components/Profile'
import { useAuth } from './store/store'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/Firebase'
import axios from 'axios'
import Home from './components/Home'
import Market from './components/Market'

const AuthRoute = ({ children }) => {
  const { isLogin } = useAuth();
  return isLogin ? children : <Navigate to="/" />;
}

const LoginRoute = ({ children }) => {
  const { isLogin } = useAuth();
  return isLogin ? <Navigate to="/home"/>: children ;
}

function App() {
  const { user, setUser, setIsLogin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [apiKey,setApiKey]=useState("");


  useEffect(() => {
    
    const getkeys = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-keys/${user.uid}`);
      console.log("res", res);

      const data = res.data; // No need for res.json(), this is Axios
      console.log("data", data);

      setUser((prev) => ({
        ...prev,
        apiKey: data.apiKey,
        secretKey: data.secretKey,
      }));
      setApiKey(data.apiKey);
      console.log("userdata after getting key", user);
    }
    if (user?.uid && !apiKey) {
      getkeys();
    }
  }, [user]);

  useEffect(() => {
    const getdata = onAuthStateChanged(auth, (u) => {
      if (u) {
        setIsLogin(true);
        setUser({
          name: u.displayName,
          email: u.email,
          photo: u.photoURL,
          uid: u.uid,
          phone: u.phoneNumber,
          emailVerified: u.emailVerified,
          apiKey: "",
          secretKey: "",
          balance: 0
        });
        setLoading(false);
        // console.log("user", user);
        console.log("user", u.displayName);
        console.log("user", user);
      }
      else {
        setIsLogin(false);
        setUser(null);
        setLoading(false);
      }
    });

    return () => getdata();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
          <h1 className="text-2xl">Loading...</h1>
        </div>
      ) : (

        <Routes>
          <Route path="/" element={<LoginRoute> <Login /> </LoginRoute> } />
          <Route path="/trade" element={<TradeForms />} />
          <Route path="/profile" element={<AuthRoute><Profile /></AuthRoute> } />
          <Route path="/home" element={<AuthRoute> <Home/> </AuthRoute> }/>
          <Route path="/market" element={<AuthRoute> <Market/> </AuthRoute> }/>
        </Routes>
      )}
    </>
  )
}

export default App
