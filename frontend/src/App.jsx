import { BrowserRouter, Routes } from "react-router";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Body from "./Components/Body";

const App = () => {
   return(
    <>
      <BrowserRouter basename="/">
       <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
         </Route>
       </Routes>
      </BrowserRouter>
    </> 
   );
}

export default App;