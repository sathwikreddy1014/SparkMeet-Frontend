import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../utils/sendOtpThunk";   
import { setForgotEmail } from "../utils/forgotSlice"; 


const ForgotPassword = () => {
  const [emailId, setemailId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // send OTP
    const res = await sendOtp(emailId);
    
    alert(res.message)

   /// inside handleSubmit:
dispatch(setForgotEmail(emailId));
localStorage.setItem("forgotEmail", emailId);
localStorage.setItem("resetSession", "true");
navigate("/verify-reset-code");

    
    setemailId("");
  } catch (err) {
    seterror(`${err?.response?.data?.message}`)
  
    //alert(err); // optional
  } finally {
    setLoading(false);
  }
};


  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 px-4">
      <div className="relative w-full max-w-md bg-neutral-900/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-neutral-700">
        
        

        {/* Heading */}
        <h2 className="text-white text-3xl font-semibold text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-neutral-400 text-sm text-center mb-8">
          Enter your email address and we’ll send you an OTP to reset your password.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            value={emailId}
            onChange={(e) => setemailId(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />

          {error && <p className="text-green-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <a
            href="/login"
            className="text-indigo-400 text-sm hover:underline"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
