import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../utils/sendOtpThunk";   // thunk
import { setForgotEmail } from "../utils/forgotSlice"; // new slice

const ForgotPassword = () => {
  const [emailId, setemailId] = useState("iyer@gmail.com");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // send OTP
    const res = await sendOtp(emailId);

   /// inside handleSubmit:
dispatch(setForgotEmail(emailId));
localStorage.setItem("forgotEmail", emailId);
navigate("/verify-reset-code");

    console.log("OTP sent to:", res.message);
    setemailId("");
  } catch (err) {
    console.error("Error:", err);
    alert(err); // optional
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="w-full max-w-md bg-neutral-800 rounded-2xl shadow-lg p-8 border border-neutral-700">
        <h2 className="text-white text-2xl font-bold text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-neutral-400 text-sm text-center mb-6">
          Enter your email address and we’ll send you an OTP to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={emailId}
              onChange={(e) => setemailId(e.target.value)}
              required
              className="input input-bordered w-full bg-neutral-700 text-white placeholder-neutral-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full rounded-lg"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/login" className="text-blue-500 text-sm hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
