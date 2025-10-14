import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearForgotEmail } from "../utils/forgotSlice";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        BASE_URL + "/reset-password",
        { newPassword },
        { withCredentials: true }
      );

      // ✅ clear state
      localStorage.removeItem("forgotEmail");
      localStorage.removeItem("resetSession");
      dispatch(clearForgotEmail());

      alert("Password reset successful. Please log in.");
      navigate("/login");
    } catch (err) {
      setError(`Reset error: ${err.response?.data?.message || ""}`);
      alert(err.response?.data?.message || "Password reset failed");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 px-4">
      <div className="relative w-full max-w-md bg-neutral-900/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-neutral-700">
        
        {/* Back button */}
        <button
          onClick={() => navigate("/verify-reset-code")}
          className="absolute top-4 left-4 p-2 hover:bg-neutral-800 rounded-full transition"
        >
          <ArrowLeft className="w-6 h-6 text-neutral-400 hover:text-white" />
        </button>

        {/* Heading */}
        <h2 className="text-white text-3xl font-semibold text-center mb-6">
          Set New Password
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />

            {/* Eye icon toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-center text-sm mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
