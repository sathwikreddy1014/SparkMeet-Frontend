// sendOtp.js
import axios from "axios";
import { BASE_URL } from "./constants";
import { ApiError } from "../utils/Error";

export const sendOtp = async (emailId) => {
  try {
    const res = await axios.post(
      BASE_URL + "/forgot-password",
      { emailId }, // request body
      { withCredentials: true }
    );
    return res.data; // { message: "OTP sent to your email" }
  } catch (error) {
    throw new ApiError(500, "Failed to send OTP:",
      error.response?.data?.message || error.message)// so caller can handle it
  }
};
