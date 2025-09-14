import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "../utils/appstore";
import Feed from "./components/Feed";
import ErrorPage from "./components/ErrorPage";
import Profile from "./components/Profile";
import VerifyResetCode from "./components/VerifyResetCode";
import ForgotPassword from "./components/ForgotPassword";
import NewPassword from "./components/NewPassword";
import ResetRoute from "./components/ResetRoute";

export default function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* 🔓 Public routes (no Body wrapper) */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/verify-reset-code"
            element={
              <ResetRoute>
                <VerifyResetCode />
              </ResetRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ResetRoute>
                <NewPassword />
              </ResetRoute>
            }
          />
          <Route path="/errorpage" element={<ErrorPage />} />

          {/* 🔒 Private routes (with Body wrapper) */}
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
