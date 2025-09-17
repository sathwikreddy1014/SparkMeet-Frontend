import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user?.data);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar  shadow-lg justify-between px-4 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 ">
      {/* Left: Logo + Name */}
      <div className="flex items-center gap-2">
        <img
          src="/logo.jpg"
          alt="logo"
          className="w-10 h-10 rounded-full shadow-lg"
        />
        <Link to="/" className="text-xl font-bold">
          Spark Meet
        </Link>
      </div>

      {/* Right: Avatar Dropdown */}
      {userData && (
        <div className="flex items-center">
          <div className="px-2">Welcome, {userData?.firstName}</div>
          <div className="dropdown dropdown-end mx-8">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user photo"
                  src={userData?.photoUrl || "/default-avatar.png"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/user/connections">Connections</Link>
              </li>
              <li>
                <Link to="/request/review/">Requests</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
