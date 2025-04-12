import { useAuth } from "@/store/store";
import Navbar from "./Navbar";

const Home=()=>{
    const {isLogin} =useAuth();
    {
        console.log("isLogin" , isLogin);
    }
    return(
        <div className="flex font-bold justify-center items-center">
            <Navbar/>
        </div>
    )
}

export default Home;