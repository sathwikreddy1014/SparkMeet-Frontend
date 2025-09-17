import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import forgotReducer from "./forgotSlice";
import ConnectionReducer from "./ConnectionSlice";
import RequestsReducer from "./RequestSlice"

const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        forgot: forgotReducer,
        connections: ConnectionReducer,
        requests : RequestsReducer
    }
});

export default appStore