import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import "../assets/Custom.css";

const SideBar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");

  return (
    <>
      <nav className={`bg-white shadow-md custom-sidebar`}>
        <div className="mx-auto px-6 py-3 flex justify-between items-center">
          <div
            className="text-xl font-bold text-gray-800 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Work Sync
          </div>
          <div className="block lg:hidden">
            <button
              className="text-gray-800 focus:outline-none"
              id="navbar-toggle"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <div
            className="w-full lg:flex lg:items-center lg:w-auto hidden"
            id="navbar-menu"
          >
            <ul className="lg:flex lg:space-x-6">
              {accessToken ? (
                <>
                  <li
                    className="block text-gray-800 py-2 px-4 cursor-pointer"
                    onClick={() => {
                      navigate("/employee-list");
                    }}
                  >
                    Employees
                  </li>
                  <li
                    className="block text-gray-800 py-2 px-4 cursor-pointer"
                    onClick={() => {
                      navigate("/vendor-list");
                    }}
                  >
                    Vendors
                  </li>
                  <li
                    className="block text-gray-800 py-2 px-4 cursor-pointer"
                    onClick={() => {
                      navigate("/emails");
                    }}
                  >
                    Emails
                  </li>
                  <li>
                    <Profile />
                  </li>
                </>
              ) : (
                <>
                  <li
                    className="block text-gray-800 py-2 px-4 cursor-pointer"
                    onClick={() => {
                      navigate("/signUp-form");
                    }}
                  >
                    SignUp
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
