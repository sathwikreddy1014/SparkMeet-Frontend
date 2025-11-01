import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import {
  Heart,
  Users,
  MessageCircle,
  Star,
  Settings,
  Bell,
} from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const avatarUrl =
    Array.isArray(userData?.photoUrl) && userData.photoUrl.length
      ? userData.photoUrl[0]
      : "/default-avatar.png";

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <Heart className="text-pink-500 w-6 h-6" />
        <Link
          to="/"
          className="text-xl font-semibold text-gray-800 hover:text-pink-500 transition"
        >
          Spark
        </Link>
      </div>

      {/* Center - Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          to="/feed"
          className="text-gray-700 hover:text-pink-500 font-medium flex items-center gap-2"
        >
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-semibold">
            Feed
          </span>
        </Link>

        <Link
          to="/connections"
          className="text-gray-700 hover:text-pink-500 font-medium flex items-center gap-2"
        >
          <Users className="w-4 h-4" /> Connections
        </Link>

        <Link
          to="/request/review"
          className="text-gray-700 hover:text-pink-500 font-medium flex items-center gap-2"
        >
          <Bell className="w-4 h-4" /> Requests
        </Link>

        <Link
          to={`/chat/:targetUserId`}
          className="text-gray-700 hover:text-pink-500 font-medium flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" /> Chat
        </Link>

        <Link
          to="/premiunplans"
          className="text-gray-700 hover:text-pink-500 font-medium flex items-center gap-2"
        >
          <Star className="w-4 h-4" /> Premium
        </Link>

        <Link
          to="/settings"
          className="text-gray-700 hover:text-pink-500 font-medium flex items-center gap-2"
        >
          <Settings className="w-4 h-4" /> Settings
        </Link>
      </div>

      {/* Right - Profile */}
      {userData ? (
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-gray-800 font-medium">
            {userData.firstName}
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={avatarUrl} alt="user avatar" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-lg shadow-lg mt-3 w-48"
            >
              <li>
                <Link to="/edit">Edit Profile</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link
          to="/login"
          className="btn bg-pink-500 text-white hover:bg-pink-600 font-semibold px-4 py-2 rounded-lg"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
