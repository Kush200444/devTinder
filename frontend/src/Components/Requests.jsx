import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useEffect } from "react";
const Requests = () => {
   const requests = useSelector((store) => store.requests);
  const dispatch  = useDispatch();
  const reviewRequest = async (status,_id) => {
      try{
          const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,{},{
            withCredentials:true
          });
          dispatch(removeRequest(_id));
      }catch(err){
         console.error(err);
      }
  }
  const fetchRequests = async ()  => {
       try{
         const res = await axios.get(BASE_URL + "/user/requests/recieved", {
            withCredentials: true
         });
         dispatch(addRequests(res.data.data));
         console.log
       }catch(err){
          console.error(err);
       }
  }
 useEffect(() => {
    fetchRequests();
 },[]);

 
   if (!requests) return null;
  return(
   <> {
      requests.map((request) => {
         const {firstName,lastName,photoUrl, age, gender, about, _id} = request.fromUserId;
      })
     
   }
    console.log(request.fromUserId);
   
   <h1>Requests</h1>
   <button onClick ={() => reviewRequest("accepted",request._id)}>Accept</button>
   <button onClick ={() => reviewRequest("rejected",request._id)}>Reject</button>
  </>
  )
}

export default Requests;