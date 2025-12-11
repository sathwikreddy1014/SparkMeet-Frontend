import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './navbar';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useEffect } from 'react';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user?.data);

  const publicRoutes = [
    "/login",
    "/forgot-password",
    "/verify-reset-code",
    "/reset-password",
  ];

  const fetchUser = async () => {
    try {
      if (!userData) {
        const res = await axios.get(`${BASE_URL}/view`, {
          withCredentials: true,
        });
        dispatch(addUser(res.data?.data || res.data));
      }
    } catch (err) {
      if (err.response?.status === 401) {
        if (!publicRoutes.includes(location.pathname)) {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (publicRoutes.some((path) => location.pathname.startsWith(path))) return;
    fetchUser();
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-amber-50 text-black"> 
 0     {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Centered Scrollable Outlet Content */}
      <main className="flex-grow mt-[64px] overflow-y-auto flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Body;
