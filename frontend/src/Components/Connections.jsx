import axios from "axios";
import BASE_URL from "../utils/constants";

const Connections = () => { 
 const fetchConnections = async () => {
    try{
     const res = await axios.get(BASE_URL + "/user/connections",{
      withCredentials:true
     });
     console.log(res.data);
    }catch(err){
        console.error(err);
    }
 }
 <h1>Connections</h1>
}
export default Connections;