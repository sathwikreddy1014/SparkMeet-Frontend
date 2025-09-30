import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  // (userData);
  

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/api/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const avatarUrl =
    Array.isArray(userData?.photoUrl) && userData.photoUrl.length
      ? userData.photoUrl[0]
      : "/default-avatar.png";

  // ✅ Show navbar even if user not loaded, just without user info
  return (
    <div className="navbar shadow-lg justify-between px-4 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600">
      {/* Left: Logo + Name */}
      <div className="flex items-center gap-2">
        <img
          src="/logo.jpg"
          alt="logo"
          className="w-10 h-10 rounded-full shadow-lg"
        />
        <Link to="/" className="text-xl font-bold text-white">
          Spark Meet
        </Link>
      </div>

      {/* Right: User Dropdown (only if logged in) */}
      {userData ? (
        <div className="flex items-center">
          <div className="px-2 text-white">Welcome, {userData.firstName}</div>
          <div className="dropdown dropdown-end mx-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={avatarUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/api/profile/view">Profile</Link>
              </li>
              <li>
                <Link to="api/user/connections">Connections</Link>
              </li>
              <li>
                <Link to="api/request/review/">Requests</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <Link
            to="/login"
            className="btn btn-sm bg-white text-purple-600 font-semibold hover:bg-gray-200"
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
