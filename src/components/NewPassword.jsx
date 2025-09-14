import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearForgotEmail } from "../../utils/forgotSlice";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const emailId = localStorage.getItem("forgotEmail");

      await axios.post(
        BASE_URL + "/reset-password",
        { emailId, password },
        { withCredentials: true }
      );

      // ✅ clear state
      localStorage.removeItem("forgotEmail");
      localStorage.removeItem("resetSession");
      dispatch(clearForgotEmail());

      alert("Password reset successful. Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Reset error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="w-full max-w-md bg-neutral-800 rounded-2xl shadow-lg p-8 border border-neutral-700">
        <h2 className="text-white text-2xl font-bold text-center mb-2">
          Set New Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full bg-neutral-700 text-white placeholder-neutral-400"
          />
          <button type="submit" className="btn btn-primary w-full rounded-lg">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
