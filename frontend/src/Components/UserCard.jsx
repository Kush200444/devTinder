import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

  const UserCard = ({user,className=""}) => {
  const {_id} = user || {};
  const dispatch = useDispatch();
  const handleSendRequest = async (status,userId) => {
     try{
       await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,
        {},{
          withCredentials: true
        })
       dispatch(removeUserFromFeed(userId))
     }catch(err){
      console.error("Error sending request:", err);
     }
  }
  return (
    <div className={`flex justify-center items-center w-full p-2 ${className}`}>
      <div className="relative w-full max-w-sm">
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

        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-6 z-50">
          <button
            onClick={() => handleSendRequest("ignored",_id)}
            className="btn btn-circle btn-lg btn-error text-white hover:scale-110 transition-transform shadow-lg"
            title="Reject"
          >
            ✕
          </button>
          <button
            onClick={() => handleSendRequest("interested",_id)}
            className="btn btn-circle btn-lg btn-success text-white hover:scale-110 transition-transform shadow-lg"
            title="Accept"
          >
            ❤
          </button>
        </div>
    
    </div>
  );
};

export default UserCard;
