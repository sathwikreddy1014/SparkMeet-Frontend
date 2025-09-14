import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import forgotReducer from "./forgotSlice";

const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        forgot: forgotReducer
    }
});

export default appStore