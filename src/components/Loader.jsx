import { CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";

const Loader = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login-form";
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <CircularProgress />
        {isLoginPage && (
          <h6 className="font-bold mt-5 w-3/5 text-center text-gray-800">
            Please hold on for a moment while the backend services wake up. This
            might take a little time due to server inactivity. Thank you for
            your patience! 🙂
          </h6>
        )}
      </div>
    </>
  );
};

export default Loader;
