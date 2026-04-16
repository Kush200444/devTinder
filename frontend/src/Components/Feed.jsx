import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
    const feedData = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(0);

    const getFeed = async () => {
        try{
          const response = await axios.get(BASE_URL + "/user/feed",{
            withCredentials:true
          });
            dispatch(addFeed(response.data));
            setCurrentIndex(0);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        getFeed();
    },[]);

    const handleActionComplete = () => {
        setCurrentIndex((prev) => prev + 1);
    };

    const users = feedData?.user || [];
    const currentUser = users[currentIndex];

    return(
        <div className="w-full feed-page">
          <UserCard user={currentUser} onActionComplete={handleActionComplete} />
        </div>
    )
}
export default Feed;
