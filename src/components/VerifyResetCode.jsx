import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { setForgotEmail } from "../../utils/forgotSlice";

const VerifyResetCode = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailId = useSelector((state) => state.forgot.emailId);

  // ✅ restore email if Redux is empty
  useEffect(() => {
    const storedEmail = localStorage.getItem("forgotEmail");
    if (!emailId && storedEmail) {
      dispatch(setForgotEmail(storedEmail));
    }
  }, [emailId, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const activeEmail = emailId || localStorage.getItem("forgotEmail");

      if (!activeEmail) {
        navigate("/login");
        return;
      }

      const res = await axios.post(
        BASE_URL + "/verify-reset-code",
        { emailId: activeEmail, otp },
        { withCredentials: true }
      );

      console.log("Verify response:", res.data);

      // ✅ save state for refresh
      localStorage.setItem("forgotEmail", activeEmail);
      localStorage.setItem("resetSession", "true");
      navigate("/reset-password");
      dispatch(setForgotEmail(activeEmail));
    } catch (err) {
      console.error("Verification error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="w-full max-w-md bg-neutral-800 rounded-2xl shadow-lg p-8 border border-neutral-700">
        <h2 className="text-white text-2xl font-bold text-center mb-2">
          Verify OTP
        </h2>
        <p className="text-neutral-400 text-sm text-center mb-6">
          Enter the 6-digit OTP sent to your email
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="input input-bordered w-full bg-neutral-700 text-white placeholder-neutral-400"
          />

          <button type="submit" className="btn btn-primary w-full rounded-lg">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyResetCode;
