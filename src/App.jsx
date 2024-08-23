import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Form from "./components/DataForm";
import SideBar from "./components/SideBar";
import UserList from "./components/UserList";
import EmailTemplate from "./components/EmailTemplate";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    if (!accessToken) {
      navigate("/login-form");
      return;
    }
  }, []);

  return (
    <>
      <SideBar />
      <div style={{ paddingTop: "15px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp-form" element={<LoginForm isSignUp={true} />} />
          <Route path="/login-form" element={<LoginForm isSignUp={false} />} />
          <Route path="/employee-form" element={<Form userform="employee" />} />
          <Route path="/vendor-form" element={<Form userform="vendor" />} />
          <Route
            path="/employee-list"
            element={<UserList userList="employee" />}
          />
          <Route path="/vendor-list" element={<UserList userList="vendor" />} />
          <Route path="/emails" element={<EmailTemplate />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
