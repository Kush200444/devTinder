import React from 'react';

const Login = () => {
  const[email, setEmail] = React.useState("");
  const[password, setPassword] = React.useState("");
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
      <button className="btn btn-primary justify-center items-center">Login</button>
    </div>
  </div>
</div>
    </>
  );
};

export default Login;
