// sendOtp.js
import axios from "axios";
import { BASE_URL } from "./constants";


export const sendOtp = async (emailId) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/profile/forgot-password`,
      { emailId }, // request body
      { withCredentials: true }
    );
    return res.data; // { message: "OTP sent to your email" }
  } catch (error) {
    console.error(
      "Failed to send OTP:",
      error.response?.data?.message || error.message
    );
    throw null// so caller can handle it
  }
};
