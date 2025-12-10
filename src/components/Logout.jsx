import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

// Make Logout a function, not a component
export const logoutUser = async (dispatch, navigate) => {
  try {
    await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    dispatch(removeUser());
    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
