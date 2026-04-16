import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useEffect } from "react";

const Connections = () => { 
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true
      });
      dispatch(addConnections(res.data));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  // Show loading state
  if (!connections) return;

  // Show empty state
  if (connections.length === 0) {
    return (
      <div className="connections-page w-full min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-96"> 
            <div className="text-center">
              <p className="text-4xl mb-4">💫</p>
              <p className="text-xl text-gray-400">No connections yet!</p>
              <p className="text-sm text-gray-500 mt-2">Start liking profiles to build your network</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="connections-page w-full min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-white">Your Connections</h1>
          <div className="flex items-center gap-3 mb-6">
            <div className="badge badge-lg badge-primary text-base font-bold">
              {connections.length} {connections.length === 1 ? "Connection" : "Connections"}
            </div>
            <p className="text-gray-400">People who want to connect with you</p>
          </div>
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </div>

        {/* Connections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => (
            <div key={connection._id} className="card card-compact bg-base-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              {/* Image Section */}
              <figure className="relative h-48 overflow-hidden">
                <img
                  src={connection?.photoUrl || "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"}
                  alt={connection?.firstName}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </figure>

              {/* Info Section */}
              <div className="card-body">
                {/* Name and Age */}
                <div className="flex items-center justify-between mb-2">
                  <h2 className="card-title text-lg">
                    {connection?.firstName} {connection?.lastName}
                  </h2>
                  {connection?.age && (
                    <span className="badge badge-primary">{connection.age}</span>
                  )}
                </div>

                {/* Location and Gender */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {connection?.gender && (
                    <span className="badge badge-outline text-xs">{connection.gender}</span>
                  )}
                  {connection?.location && (
                    <span className="badge badge-outline text-xs">📍 {connection.location}</span>
                  )}
                </div>

                {/* About Section */}
                {connection?.about && (
                  <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                    {connection.about}
                  </p>
                )}

                {/* Skills Section */}
                {connection?.skills && connection.skills.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-400 mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {connection.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="badge badge-sm badge-accent">
                          {skill}
                        </span>
                      ))}
                      {connection.skills.length > 3 && (
                        <span className="badge badge-sm">+{connection.skills.length - 3}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Star Icon */}
                <div className="card-actions justify-center pt-2">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Connections;