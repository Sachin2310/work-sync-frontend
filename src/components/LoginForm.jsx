import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToken } from "../redux/accessTokenSlice";
import axiosClient from "../js/AxiosInstance";

const LoginForm = ({ isSignUp }) => {
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  }

  async function handleClick() {
    const RequestBody = {
      ...userDetails,
    };
    const response = await axiosClient.post(
      isSignUp ? `/auth/signup` : `/auth/login`,
      RequestBody
    );
    console.log(response);

    if (isSignUp) {
      navigate("/login-form");
      return;
    } else {
      dispatch(addToken(response.data));
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("current-user", userDetails.email);
      navigate("/");
      return;
    }
  }

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto mt-20">
        <h2 className="text-2xl flex justify-center font-bold mb-6 text-gray-800">
          {" "}
          {isSignUp ? "SignUp" : "Login"}
        </h2>
        {isSignUp && (
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
        )}
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
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        {isSignUp ? (
          <div className="flex justify-center mb-3 mt-8 text-gray-800">
            Already have an account?{" "}
            <Link to={"/login-form"} className="ml-1 font-bold">
              Login
            </Link>
          </div>
        ) : (
          <div className="flex justify-center mb-3 mt-8 text-gray-800">
            Don't have an account?{" "}
            <Link to={"/signUp-form"} className="ml-1 font-bold">
              SignUp
            </Link>
          </div>
        )}
        <div>
          <button
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            onClick={(e) => handleClick(e)}
          >
            {isSignUp ? "SignUp" : "Login"}
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
