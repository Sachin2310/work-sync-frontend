import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/employeeSlice";
import { addVendor } from "../redux/vendorSlice";
import { useNavigate } from "react-router-dom";
import axiosClient from "../js/AxiosInstance";

const Form = ({ userform, onClose }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("token");

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  async function handleClick(userType) {
    const commonFields = {
      email: user.email,
      name: user.name,
    };

    const employeeField = {
      ...commonFields,
      CTC: user.CTC,
      designation: user.designation,
    };
    const vendorField = {
      ...commonFields,
      upi: user.upi,
    };

    const response = await axiosClient.post(
      `/${userType}`,
      userType === "employee" ? employeeField : vendorField,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data) {
      if (userType === "employee") {
        dispatch(addEmployee(response.data));
        navigate("/employee-list");
      } else {
        dispatch(addVendor(response.data));
        navigate("/vendor-list");
      }
    }
    onClose();
  }

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto mt-20">
        <h2 className="text-2xl flex justify-center font-bold mb-6 text-gray-800">
          {" "}
          Add {userform}
        </h2>
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          {userform === "vendor" && (
            <div className="mb-4">
              <label htmlFor="upi" className="block text-gray-700">
                UPI
              </label>
              <input
                type="text"
                name="upi"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          )}
          {userform === "employee" && (
            <>
              <div className="mb-4">
                <label htmlFor="designation" className="block text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="CTC" className="block text-gray-700">
                  CTC
                </label>
                <input
                  type="number"
                  name="CTC"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </>
          )}
          <div>
            <button
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              onClick={() => handleClick(userform)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
