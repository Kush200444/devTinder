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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getFeed = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(BASE_URL + "/user/feed", {
                withCredentials: true
            });
            dispatch(addFeed(response.data));
            setCurrentIndex(0);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError(err?.response?.data?.message || "Failed to load feed");
            setLoading(false);
        }
    }

    useEffect(() => {
        getFeed();
    }, []);

    const handleActionComplete = () => {
        setCurrentIndex((prev) => prev + 1);
    };

    const users = feedData?.user || [];
    const currentUser = users[currentIndex];

    // Loading State
    if (loading) {
        return (
            <div className="w-full feed-page min-h-screen flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-gray-400">Loading profiles...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="w-full feed-page min-h-screen flex justify-center items-center">
                <div className="alert alert-error shadow-lg max-w-md">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m2-2l2 2" />
                        </svg>
                        <span>{error}</span>
                    </div>
                    <div className="flex-none">
                        <button className="btn btn-sm" onClick={getFeed}>Retry</button>
                    </div>
                </div>
            </div>
        );
    }

    // No Users State
    if (users.length === 0) {
        return (
            <div className="w-full feed-page min-h-screen flex justify-center items-center">
                <div className="text-center">
                    <p className="text-2xl font-bold text-white mb-2">No more profiles</p>
                    <p className="text-gray-400">You've reviewed everyone for now!</p>
                </div>
            </div>
        );
    }

    // All users swiped State
    if (currentIndex >= users.length) {
        return (
            <div className="w-full feed-page min-h-screen flex justify-center items-center">
                <div className="text-center">
                    <p className="text-6xl mb-4">✨</p>
                    <p className="text-2xl font-bold text-white mb-2">All caught up!</p>
                    <p className="text-gray-400 mb-6">Check back soon for more profiles</p>
                    <button className="btn btn-primary" onClick={getFeed}>Refresh Feed</button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full feed-page min-h-screen py-6">
            <UserCard user={currentUser} onActionComplete={handleActionComplete} />
        </div>
    )
}
export default Feed;
