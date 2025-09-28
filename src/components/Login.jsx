import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: "@gmail.com",
    password: "Qwerty@123",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // 🔑 Login
        const profileRes = await axios.post(
          `${BASE_URL}/login`,
          { emailId: formData.emailId, password: formData.password },
          { withCredentials: true }
        );
        dispatch(addUser(profileRes.data?.data || profileRes.data));
        setToast("Logged in successfully!");
      } else {
        // 📝 Signup
        await axios.post(`${BASE_URL}/signup`, formData, {
          withCredentials: true,
        });
        setToast("Signed up successfully!");
      }

      // 🎯 Navigate
      navigate(isLogin ? "/" : "/profile");

      // Hide toast after 3s
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      setError(
        `${isLogin ? "LOGIN" : "SIGNUP"} FAILED. ${
          err?.response?.data?.error || "Please try again."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
      >
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block p-4 sm:p-6 lg:p-8 bg-white/20 rounded-full mb-4 sm:mb-6"
          >
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-4">
            Welcome to SparkMeet
          </h1>
          <p className="text-white/80 text-sm sm:text-base lg:text-lg">
            Find your perfect match today
          </p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/20"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium text-white mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 sm:w-6 sm:h-6" />
                <input
                  type="email"
                  name="emailId"
                  id="email"
                  value={formData.emailId}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm sm:text-base font-medium text-white mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 sm:w-6 sm:h-6" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-3 sm:py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Signup fields */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm sm:text-base font-medium text-white mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-3 pr-3 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-white mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-3 pr-3 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Enter last name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-white mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full pl-3 pr-3 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Enter age"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-white mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full pl-3 pr-3 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-purple-600 py-3 sm:py-4 px-4 rounded-xl font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base lg:text-lg"
            >
              {loading
                ? isLogin
                  ? "Signing in..."
                  : "Signing up..."
                : isLogin
                ? "Sign In"
                : "Sign Up"}
            </button>

            {error && (
              <p className="text-red-500 text-center text-sm mt-2">{error}</p>
            )}
          </form>

          {/* Forgot password */}
          <div className="mt-4 sm:mt-6 text-center">
            <Link
              to="/forgot-password"
              className="text-white/80 hover:text-white text-sm sm:text-base transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Toggle Login/Signup */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20 text-center">
            <span className="text-white/80 text-sm sm:text-base">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                className="text-white font-semibold hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </span>
          </div>
        </motion.div>

        {/* Toast */}
        {toast && (
          <div className="toast toast-top toast-center py-20">
            <div className="alert alert-success">
              <span>{toast}</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
