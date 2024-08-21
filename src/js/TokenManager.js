import axiosClient from "./AxiosInstance";

export async function validateToken() {
  try {
    const accessToken = localStorage.getItem("token");
    const isTokenValid = await axiosClient.post(`token/validate`, accessToken);
    return isTokenValid.data;
  } catch (error) {
    console.log(
      `token: ${accessToken}, error response: ${JSON.stringify(
        error.response.data
      )}`
    );
    return false;
  }
}

export async function generateToken() {
  try {
    const updatedToken = await axiosClient.get(`token/generate`, {
      headers: {
        "User-Email": localStorage.getItem("current-user"),
      },
    });
    localStorage.setItem("token", updatedToken.data);
    return updatedToken;
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
}
