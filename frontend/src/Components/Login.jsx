import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = () => {
  const[email, setEmail] = React.useState("viratkohli@gmail.com");
  const[password, setPassword] = React.useState("Virat@12345");
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
      return navigate("/");
    }catch(err){
      console.error(err);
    }
  }
  return (
    <>
      <div className="card bg-base-200 w-96 shadow-sm mx-auto mt-10">
  <div className="Login card-body ">
    <h2 className="card-title justify-center items-center ">Login</h2>
    <div className="card-actions my-5 flex-col ">
      <fieldset className="fieldset w-full">
      <legend className="fieldset-legend">Email</legend>
      <input type="text"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       className="input" 
       placeholder="Email" />
    
      <legend className="password">Password</legend>
      <input type="Password"
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       className="input"
        placeholder="Password" />
      </fieldset>
      <button className="btn btn-primary justify-center items-center" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </>
  );
};

export default Login;
