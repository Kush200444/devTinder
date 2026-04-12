import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Body from "./Components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";


const App = () => {
  return (
    <Provider store={appStore}>
    <Router basename="/">

      <Routes>
        <Route path="/" element={<Body />}>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>

    </Router>
    </Provider>
  );
}

export default App;