import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { Heart } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const res = await axios.post(
          `${BASE_URL}/login`,
          { emailId: formData.emailId, password: formData.password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data.data));
        navigate("/");
      } else {
        await axios.post(`${BASE_URL}/signup`, formData, {
          withCredentials: true,
        });
        navigate("/edit");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Hero */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-tr from-pink-500 via-red-500 to-orange-400 text-white items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="z-10 text-center p-10">
          <div className="flex justify-center mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Find Your Spark</h1>
          <p className="text-lg opacity-90">
            Connect with amazing people near you
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            {isLogin
              ? "Sign in to continue your journey"
              : "Start your journey today!"}
          </p>

          {/* Toggle buttons */}
          <div className="flex justify-center bg-gray-100 rounded-full p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-2 text-sm font-semibold rounded-full transition ${
                isLogin
                  ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white"
                  : "text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-2 text-sm font-semibold rounded-full transition ${
                !isLogin
                  ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white"
                  : "text-gray-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                {/* First & Last Name */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-1/2 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-1/2 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
                    required
                  />
                </div>
              </>
            )}

            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />

            {!isLogin && (
              <>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
                  required
                />

                {/* Stylish Gender Selection */}
                <div>
                  <p className="text-gray-600 mb-2 text-sm font-medium">
                    Select Gender
                  </p>
                  <div className="flex justify-between">
                    {["male", "female", "other"].map((g) => (
                      <label
                        key={g}
                        className={`flex-1 text-center border rounded-lg py-3 mx-1 cursor-pointer transition ${
                          formData.gender === g
                            ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold"
                            : "border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={handleChange}
                          className="hidden"
                        />
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 transition disabled:opacity-50"
            >
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Creating account..."
                : isLogin
                ? "Login"
                : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/forgot-password"
              className="text-sm text-pink-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="text-xs text-gray-500 text-center mt-8">
            By continuing, you agree to our{" "}
            <Link
              to="/terms-and-conditions"
              className="text-pink-500 hover:underline"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy-policy"
              className="text-pink-500 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
