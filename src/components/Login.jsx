import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../utils/userSlice";
import { BASE_URL } from "../../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("iyer@gmail.com");
  const [password, setPassword] = useState("Qwerty@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("LOGIN FAILED. PLEASE TRY AGAIN.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blend-hard-light">
      <div className="w-full max-w-md bg-neutral-900 rounded-2xl shadow-lg p-8 border border-neutral-800">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
          src="/logo.jpg"
          alt="logo"
          className="w-12 h-15 rounded-full shadow-lg"
        />
        </div>

        {/* Title */}
        <h2 className="text-white text-2xl font-bold text-center mb-1">
          Welcome Back
        </h2>
        <p className="text-neutral-400 text-sm text-center mb-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
              className="w-full px-4 py-3 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs font-semibold text-center">
              {error.toUpperCase()}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <hr className="flex-grow border-neutral-700" />
          <span className="text-neutral-500 text-sm">OR</span>
          <hr className="flex-grow border-neutral-700" />
        </div>

        {/* Social login buttons */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition text-white">
            
          </button>
          <button className="flex-1 py-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition text-white">
            G
          </button>
          <button className="flex-1 py-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition text-white">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
