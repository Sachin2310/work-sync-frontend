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
    if (
      error.message === "Network Error" &&
      window.location.pathname !== "/login-form"
    ) {
      redirectToLoginPage();
    }
    if ((error.response.data?.message).includes("User not found with email")) {
      return Promise.reject(error);
    }
    if (error.response.status === 401 || error.response.status === 403) {
      updateToken();
      return;
    }
    redirectToLoginPage();
    return Promise.reject(error);
  }
);

export default axiosClient;
