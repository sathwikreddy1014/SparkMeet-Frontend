// sendOtp.js
import axios from "axios";
import { BASE_URL } from "./constants";

export const sendOtp = async (emailId) => {
  try {
    const res = await axios.post(
      BASE_URL + "/forgot-password",
      { emailId }, // request body
      { withCredentials: true }
    );
    // console.log("OTP sent response:", res.data);
    return res.data; // { message: "OTP sent to your email" }
  } catch (error) {
    console.error(
      "Failed to send OTP:",
      error.response?.data?.message || error.message
    );
    throw error; // so caller can handle it
  }
};
