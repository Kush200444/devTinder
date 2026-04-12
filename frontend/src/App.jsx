import Header from "./Components/Header";
import {BrowserRouter,Routes,Route} from "react-router-dom";
const App = () => {
   return(
    <>
      <BrowserRouter basename="/">
        <Routes>
         <Route path="/" element={<Body/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </>
   )
}

export default App;