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
            className="text-xl text-gray-800 px-6 py-3 font-bold text-gray-800 cursor-pointer relative group"
            onClick={() => {
              navigate("/");
            }}
          >
            <span className="relative z-10">Work Sync</span>
            <span className="absolute inset-0 bg-gray-200 opacity-0 transition-opacity duration-300 rounded-full group-hover:opacity-50"></span>
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
                    className="font-bold text-gray-800 py-2 px-4 cursor-pointer relative group"
                    onClick={() => {
                      navigate("/employee-list");
                    }}
                  >
                    <span className="relative z-10">Employees</span>
                    <span className="absolute inset-0 w-full h-full bg-gray-200 opacity-0 transition-opacity duration-300 rounded-full group-hover:opacity-50"></span>
                  </li>

                  <li
                    className="font-bold text-gray-800 py-2 px-4 cursor-pointer relative group"
                    onClick={() => {
                      navigate("/vendor-list");
                    }}
                  >
                    <span className="relative z-10">Vendors</span>
                    <span className="absolute inset-0 bg-gray-200 opacity-0 transition-opacity duration-300 rounded-full group-hover:opacity-50"></span>
                  </li>

                  <li
                    className="font-bold text-gray-800 py-2 px-4 cursor-pointer relative group"
                    onClick={() => {
                      navigate("/emails");
                    }}
                  >
                    <span className="relative z-10">Emails</span>
                    <span className="absolute inset-0 bg-gray-200 opacity-0 transition-opacity duration-300 rounded-full group-hover:opacity-50"></span>
                  </li>

                  <li>
                    <Profile />
                  </li>
                </>
              ) : (
                <>
                  <li
                    className="font-bold text-gray-800 py-2 px-4 cursor-pointer relative group"
                    onClick={() => {
                      navigate("/signUp-form");
                    }}
                  >
                    <span className="relative z-10">SignUp</span>
                    <span className="absolute inset-0 bg-gray-200 opacity-0 transition-opacity duration-300 rounded-full group-hover:opacity-50"></span>
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
