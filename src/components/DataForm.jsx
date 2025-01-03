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

  async function handleClick(e, userType) {
    e.preventDefault();
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
      <form
        onSubmit={(e) => handleClick(e, userform)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto mt-20"
      >
        <h2 className="text-2xl flex justify-center font-bold mb-6 text-gray-800">
          {" "}
          Add {userform}
        </h2>
        <div>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Email"
              required
            />
          </div>
          {userform === "vendor" && (
            <div className="mb-4">
              <input
                type="text"
                name="upi"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="UPI"
                required
              />
            </div>
          )}
          {userform === "employee" && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  name="designation"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                  placeholder="Designation"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  name="CTC"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                  placeholder="CTC"
                  required
                />
              </div>
            </>
          )}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
