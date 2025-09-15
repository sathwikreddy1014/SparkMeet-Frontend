import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, {
        withCredentials: true
      })
      dispatch(removeUser())
      return navigate('/login')
    } catch (error) {
       console.error("Logout failed:", error);
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-lg justify-between px-4">
      {/* Left: Logo + Name */}
      <div className="flex items-center gap-2">
        <img
          src="/logo.jpg"
          alt="logo"
          className="w-10 h-10 rounded-full shadow-lg"
        />
        <Link to = "/" className="text-xl font-bold">Spark Meet</Link>
      </div>

      {/* Right: Avatar Dropdown */}
      {user && (
        <div className=" flex items-center">
          <div className="px-2">Welcome, {user?.data?.firstName}</div>
          <div className="dropdown dropdown-end mx-8 ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user?.data?.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to = "/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to = "/user/connections">Connections</Link>
              </li>
              <li>
                <Link to = "/request/review/">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
