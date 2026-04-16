import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../utils/constants";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user?.user);
    const handleLogout = async () => {
      try{
        await axios.post(BASE_URL + "/logout",{},{
          withCredentials:true
        });
        dispatch(removeUser());
        return navigate("/login");
      }catch(err){
        console.error(err);
      }
    }
    return(
        <div className="navbar app-navbar px-4 md:px-8">
          <div className="flex-1">
            <Link to="/feed" className="btn btn-ghost text-xl app-brand">👨🏻‍💻 DevTinder</Link>
          </div>
          <div className="flex gap-3 items-center">
            <span className="hidden md:inline text-sm app-nav-welcome">
              {userData?.firstName ? `Hi, ${userData.firstName}` : "Welcome"}
            </span>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar app-avatar-btn">
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src={userData?.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content app-dropdown rounded-box mt-3 w-52 p-2 shadow-xl">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge app-badge">New</span>
                  </Link>
                </li>
                <li><Link to="/feed">Feed</Link></li>
                <li><Link to="/requests">Requests</Link></li>
                <li><Link to="/connections">Connections</Link></li>
                <li><button type="button" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
    )
}


export default Header;
