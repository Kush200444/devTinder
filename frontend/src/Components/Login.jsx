import axios from 'axios';
// Removed unused React import
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useState } from "react";
const Login = () => {
const [email, setEmail] = useState("viratkohli@gmail.com");
  const [password, setPassword] = useState("Virat@12345");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try{
      const response = await axios.post(BASE_URL + "/login",{
        emailId:email,
        password:password
      },{
        withCredentials:true
      });
      dispatch(addUser(response.data));
         return navigate("/feed");
    }catch(err){
      setError(err.response.data || "Something went wrong");
      console.error(err);
    }
  }
  return (
    <div className="w-full min-h-[calc(100vh-74px)] flex items-center justify-center px-4">
      <div className="card login-card w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center items-center login-title">Login</h2>
          <p className="text-center login-subtitle">Welcome back to DevTinder</p>

          <div className="card-actions my-4 flex-col">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend login-label">Email</legend>
              <input
                type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="input login-input"
                placeholder="Email"
              />

              <legend className="fieldset-legend mt-3 login-label">Password</legend>
              <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="input login-input"
                placeholder="Password"
              />
            </fieldset>
            <button className="btn login-btn justify-center items-center w-full mt-4" onClick={handleLogin}>Login</button>
            {error ? (
              <div className="login-error text-center w-full">
                <p>{error}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
