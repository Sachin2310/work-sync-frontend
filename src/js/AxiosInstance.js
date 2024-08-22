import axios from "axios";
import { generateToken } from "./TokenManager";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/worksync/api",
});

export const redirectToLoginPage = () => {
  localStorage.removeItem("token");
  window.location.href = "/login-form";
};

export const redirectToSignUpPage = () => {
  localStorage.removeItem("token");
  window.location.href = "/signUp-form";
};

const updateToken = async () => {
  const updatedToken = await generateToken();
  if (!updatedToken) {
    redirectToLoginPage();
    return;
  }
};

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Error Interceptor:", error);

    //show error message instead

    // if (
    //   error.response.data?.message ===
    //   "User not found with email: " + localStorage.getItem("current-user")
    // ) {
    //   redirectToSignUpPage();
    //   // return Promise.reject(error);
    //   return;
    // }

    if (error.response.status === 401 || error.response.status === 403) {
      updateToken();
      return;
    }
    redirectToLoginPage();
    return Promise.reject(error);
  }
);

export default axiosClient;
