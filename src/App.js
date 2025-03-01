import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import PersonalDetails from "./components/PersonalDetails";
import Cookies from "js-cookie";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

const flag = Cookies.get("jwtToken") === undefined ? false : true;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={(flag)?<Home/> : <Navigate to="login"/>} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/personal-details" element={<PersonalDetails/>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
