import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const protectedRoutes = ["/feed", "/profile", "/requests", "/connections"];
  const fetchUser = async () => {
    try{
      const response = await axios.get(BASE_URL + "/profile/view",{
        withCredentials:true
      });
      dispatch(addUser(response.data));
    }catch(err){
      console.error(err);
    } finally {
      setAuthChecked(true);
    }
  }
useEffect(() => {
    if(!userData?.user && !authChecked) {
      fetchUser();
    }
  }, [authChecked, userData?.user]);

  useEffect(() => {
    if (!authChecked) {
      return;
    }

    const isProtectedRoute = protectedRoutes.includes(location.pathname);
    if (isProtectedRoute && !userData?.user) {
      navigate("/login", { replace: true });
    }
  }, [authChecked, location.pathname, navigate, userData?.user]);

  if (!authChecked) {
    return (
      <div className="app-shell min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return(
    <div className="app-shell min-h-screen">
      <Header/>
      <main className="app-main">
        <Outlet/>
      </main>
       <Footer/> 
    </div>
  ) 
}

export default Body;
