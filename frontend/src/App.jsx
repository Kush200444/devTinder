import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Body from "./Components/Body";


const App = () => {
  return (
    <Router basename="/">

      <Routes>
        <Route path="/" element={<Body />}>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>

    </Router>
  );
}

export default App;