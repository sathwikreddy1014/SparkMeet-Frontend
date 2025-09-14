import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../../utils/constants'

export const Otpverify = createAsyncThunk(BASE_URL +
  "/verify-reset-code",
  async ({ emailId, otp }) => {
    const response = await axios.post( BASE_URL +"/verify-reset-code", {
      emailId,
      otp,
    }, {withCredentials: true});
    console.log(response.data);
    return response.data;
  }
);
