import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { adminLogout } from "../Redux/authSlice";
import { mentorLogout } from "../Redux/mentorSlice";

const Navbar = ({ setIsOpen }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAdminLoggedIn } = useSelector((state) => state.auth);
  const { isMentorLoggedIn } = useSelector((state) => state.mentor);

  const handleLogout = () => {

    if (isAdminLoggedIn) {
      dispatch(adminLogout());
    }

    if (isMentorLoggedIn) {
      dispatch(mentorLogout());
    }

    navigate("/");
  };

  if (!isAdminLoggedIn && !isMentorLoggedIn) return null;

  return (
    <nav className="bg-white border-b shadow-sm px-4 md:px-8 py-3 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <button
          className="md:hidden"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <Menu size={26} />
        </button>

        <h1
          onClick={() =>
            navigate(isAdminLoggedIn ? "/admin-dashboard" : "/mentor-dashboard")
          }
          className="text-xl md:text-2xl font-bold text-blue-600 cursor-pointer"
        >
          Programmer-Academy
        </h1>

        <span className="hidden sm:block text-xs px-3 py-1 rounded-full border border-gray-400 text-gray-600">
          {isAdminLoggedIn ? "Admin Panel" : "Mentor Panel"}
        </span>

      </div>

      <button
        onClick={handleLogout}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base transition"
      >
        Logout
      </button>

    </nav>
  );
};

export default Navbar;