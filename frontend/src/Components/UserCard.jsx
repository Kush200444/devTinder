import { useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/constants";

const UserCard = ({ user, onActionComplete, showActions = true, className = "" }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-xl text-gray-500">No more users to show!</p>
      </div>
    );
  }

  const handleAction = async (action) => {
    if (!showActions || isAnimating) {
      return;
    }

    const directionMap = {
      ignored: "left",
      interested: "right",
      skip: "up",
    };
    setSwipeDirection(directionMap[action] || "up");
    setIsAnimating(true);

    try {
      if (action === "ignored" || action === "interested") {
        await axios.post(
          `${BASE_URL}/request/send/${action}/${user._id}`,
          {},
          { withCredentials: true }
        );
      }
      setTimeout(() => {
        setIsAnimating(false);
        setSwipeDirection(null);
        onActionComplete?.(action);
      }, 280);
    } catch (err) {
      setIsAnimating(false);
      setSwipeDirection(null);
      console.error(err);
    }
  };

  return (
    <div className={`flex justify-center items-center w-full p-2 ${className}`}>
      <div
        className={`relative w-full max-w-md h-[600px] transition-all duration-300 ${
          isAnimating
            ? swipeDirection === "left"
              ? "translate-x-96 rotate-12 opacity-0"
              : swipeDirection === "right"
              ? "-translate-x-96 -rotate-12 opacity-0"
              : "translate-y-96 opacity-0"
            : "translate-x-0 translate-y-0 opacity-100"
        }`}
      >
        {/* Card */}
        <div className="card user-card-shell shadow-2xl overflow-hidden h-full">
          {/* Image Section */}
          <figure className="relative h-2/3 overflow-hidden">
            <img
              src={user?.photoUrl || "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"}
              alt={user?.firstName}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          </figure>

          {/* Info Section */}
          <div className="card-body h-1/3 p-6 relative">
            <div className="absolute inset-0 user-card-info-bg"></div>

            <div className="relative z-10">
              <h2 className="card-title text-2xl mb-2 user-card-name">
                {user?.firstName} {user?.lastName}
                {user?.age ? (
                  <span className="badge badge-primary ml-2">{user.age}</span>
                ) : null}
              </h2>
              <div className="flex flex-wrap gap-2 mb-3 text-xs user-card-meta">
                {user?.gender ? (
                  <span className="badge badge-outline">{user.gender}</span>
                ) : null}
                {user?.location ? (
                  <span className="badge badge-outline">📍 {user.location}</span>
                ) : null}
              </div>
              <p className="text-sm user-card-about mb-4 max-h-24 overflow-y-auto whitespace-pre-wrap">
                {user?.about}
              </p>

              {/* Skills */}
              {user?.skills && user.skills.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {user.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="badge badge-outline badge-sm user-card-skill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showActions ? (
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-6 z-50">
          <button
            onClick={() => handleAction("ignored")}
            className="btn btn-circle btn-lg btn-error text-white hover:scale-110 transition-transform shadow-lg"
            title="Reject"
          >
            ✕
          </button>
          <button
            onClick={() => handleAction("skip")}
            className="btn btn-circle btn-lg btn-warning text-white hover:scale-110 transition-transform shadow-lg"
            title="Ignore"
          >
            —
          </button>
          <button
            onClick={() => handleAction("interested")}
            className="btn btn-circle btn-lg btn-success text-white hover:scale-110 transition-transform shadow-lg"
            title="Accept"
          >
            ❤
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UserCard;
