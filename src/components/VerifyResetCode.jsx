import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { setForgotEmail } from "../utils/forgotSlice";
import {  ArrowLeft} from "lucide-react";

const VerifyResetCode = () => {
  const [otp, setOtp] = useState("");
  const [error, seterror] = useState('')
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

  

      // ✅ save state for refresh
      localStorage.setItem("forgotEmail", activeEmail);
      localStorage.setItem("resetSession", "true");
      navigate("/reset-password");
      dispatch(setForgotEmail(activeEmail));
    } catch (err) {
      seterror( ` Verification Error : ${err.response?.data?.message || err.message}`);
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 px-4">
      <div className="relative w-full max-w-md bg-neutral-900/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-neutral-700">
        
        {/* Back button */}
        <button
          onClick={() => navigate("/forgot-password")}
          className="absolute top-4 left-4 p-2 hover:bg-neutral-800 rounded-full transition"
        >
          <ArrowLeft className="w-6 h-6 text-neutral-400 hover:text-white" />
        </button>

        {/* Heading */}
        <h2 className="text-white text-3xl font-semibold text-center mb-2">
          Verify OTP
        </h2>
        <p className="text-neutral-400 text-sm text-center mb-8">
          Enter the 6-digit code we sent to your email
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />

          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition"
          >
            Verify OTP
          </button>
        </form>

        {/* Extra options */}
        <p className="text-neutral-400 text-xs text-center mt-6">
          Didn’t get the code?{" "}
          <button
            type="button"
            className="text-indigo-400 hover:underline"
            onClick={handleSubmit}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyResetCode;
