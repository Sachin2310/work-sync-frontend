import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmployeeList } from "../redux/employeeSlice";
import { setVendorList } from "../redux/vendorSlice";
import { useNavigate } from "react-router-dom";
import { setEmailSendersList } from "../redux/additionalStates";
import axiosClient from "../js/AxiosInstance";
import RightDrawer from "./InputDrawer";

const UserList = ({ userList }) => {
  const [users, setUsers] = useState([]);
  const [sendersList, setSendersList] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = useSelector((state) => state.employee.employees);
  const vendors = useSelector((state) => state.vendor.vendors);
  const emails = useSelector((state) => state.additionalStates.emails);
  const accessToken = localStorage.getItem("token");

  const getUsers = async () => {
    const response = await axiosClient.get(`/${userList}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const users = response.data;
    if (userList === "employee") {
      dispatch(setEmployeeList(users));
    } else {
      dispatch(setVendorList(users));
    }
    setUsers(users);
  };

  useEffect(() => {
    if (userList === "employee") {
      setUsers(employees);
    } else if (userList === "vendor") {
      setUsers(vendors);
    }
  }, [userList]);

  useEffect(() => {
    getUsers();
  }, [refresh, userList]);

  const sendEmails = async () => {
    const response = await axiosClient.post(`/email`, sendersList, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const vendorsInfo = response.data;
    if (vendorsInfo) {
      dispatch(setEmailSendersList([...emails, ...vendorsInfo]));
      navigate("/emails");
    }
  };

  function handleChange(e, userId) {
    if (e.target.checked) {
      setSendersList([...sendersList, userId]);
    } else {
      const updatedSendersList = [...sendersList];
      updatedSendersList.splice(updatedSendersList.indexOf(userId), 1);
      setSendersList(updatedSendersList);
    }
  }

  const handleDrawerClose = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="bg-gray-100 flex items-start justify-center min-h-screen">
      <div className="bg-white p-8 mt-16 rounded-lg shadow-md w-full max-w-md mx-auto">
        <h2 className="text-2xl flex justify-center font-bold mb-6 text-gray-800">
          {userList} List
        </h2>
        <div className="list-disc list-inside">
          {/* {users.map((user, id) => (
                        <div key={id} className="mb-2 h-10 mt-2 p-1 border text-gray-700"> */}

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S. No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, id) => {
                  return (
                    <tr
                      key={id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {id + 1}
                      </th>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      {userList === "vendor" && (
                        <td className="px-6 py-4">
                          {" "}
                          <input
                            type="checkbox"
                            onChange={(e) => handleChange(e, user.id)}
                          />
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {users.length > 0 && userList === "vendor" && (
              <div className="w-full mt-5 flex justify-center">
                <button
                  className="w-2/4 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                  onClick={sendEmails}
                >
                  Send Email
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <RightDrawer userType={userList} onClose={handleDrawerClose} />
    </div>
  );
};

export default UserList;
