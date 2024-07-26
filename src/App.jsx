import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css'
import Form from './components/Form';
import SideBar from "./components/SideBar";
import UserList from './components/UserList';
import EmailTemplate from "./components/EmailTemplate";

function App() {

  return (
    <>
      <BrowserRouter>
        <SideBar />
        <Routes >
          <Route path="/employee-form" element={<Form userform="employee" />} />
          <Route path="/vendor-form" element={<Form userform="vendor" />} />
          <Route path="/employee-list" element={<UserList userList="employee" />} />
          <Route path="/vendor-list" element={<UserList userList="vendor" />} />
          <Route path="/emails" element={<EmailTemplate/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
