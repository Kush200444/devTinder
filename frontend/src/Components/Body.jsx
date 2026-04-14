import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try{
      const response = await axios.get(BASE_URL + "/profile/view",{
        withCredentials:true
      });
      dispatch(addUser(response.data));
    }catch(err){
      console.error(err);
    }
  }
  useEffect(()=> {
    if(!userData){
    fetchUser()
}},[]);
  return(
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  ) 
}

export default Body;