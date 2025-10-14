import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './navbar'
import Footer from './Footer'
import axios from 'axios'
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
        // ✅ only redirect if not on a public route
        if (!publicRoutes.includes(location.pathname)) {
          navigate("/login");
        }
      } else {
        navigate("/errorpage");
      }
    }
  };

  useEffect(() => {
    // skip fetching for public routes
    if (publicRoutes.some((path) => location.pathname.startsWith(path))) return;
    fetchUser();
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
