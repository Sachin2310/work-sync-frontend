import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToken } from "../redux/accessTokenSlice";
import axiosClient from "../js/AxiosInstance";
import ErrorSnackbar from "./ErrorSnackbar";
import { startLoading, stopLoading } from "../redux/loaderSlice";

const LoginForm = ({ isSignUp }) => {
  const [userDetails, setUserDetails] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [axiosErrorMessage, setAxiosErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  }

  async function handleClick(e) {
    e.preventDefault();
    const RequestBody = {
      ...userDetails,
    };
    console.log(RequestBody);
    const response = await userAuthentication(
      isSignUp ? `/auth/signup` : `/auth/login`,
      RequestBody
    );
    console.log(response);

    if (isSignUp) {
      navigate("/login-form");
      return;
    } else {
      handleLoginResponse(response, userDetails.email);
      return;
    }
  }

  async function useTestAccountToLogin(e) {
    e.preventDefault();
    const RequestBody = {
      email: "test@test.com",
      password: 123,
    };
    const response = await userAuthentication(`/auth/login`, RequestBody);
    handleLoginResponse(response, RequestBody.email);
  }

  async function userAuthentication(url, requestBody) {
    dispatch(startLoading());
    try {
      return await axiosClient.post(url, requestBody);
    } catch (error) {
      setSnackbarOpen(true);
      setAxiosErrorMessage(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      dispatch(stopLoading());
    }
  }

  function handleLoginResponse(response, userEmail) {
    dispatch(addToken(response.data));
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("current-user", userEmail);
    navigate("/");
  }

  return (
    <form
      onSubmit={handleClick}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto mt-24"
    >
      <h2 className="text-2xl flex justify-center font-bold mb-6 text-gray-800">
        {" "}
        {isSignUp ? "SignUp" : "Login"}
      </h2>
      {isSignUp && (
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
      )}
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
      <div className="mb-4">
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          placeholder="Password"
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
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          {isSignUp ? "SignUp" : "Login"}
        </button>
      </div>
      <p className="text-center mt-6">OR</p>
      <div className="flex justify-center mt-4">
        <a
          href="#"
          onClick={useTestAccountToLogin}
          className="block w-52 text-center bg-indigo-400 text-white py-1 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Try with a test account
        </a>
      </div>
      <ErrorSnackbar
        errorMessage={axiosErrorMessage}
        toOpen={snackbarOpen}
        setToOpen={setSnackbarOpen}
      />
    </form>
  );
};

export default LoginForm;
