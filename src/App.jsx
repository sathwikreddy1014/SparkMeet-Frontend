import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appstore";
import Feed from "./components/Feed";
import ErrorPage from "./components/ErrorPage";
import Profile from "./components/Profile";

import VerifyResetCode from "./components/VerifyResetCode";
import ForgotPassword from "./components/ForgotPassword";
import NewPassword from "./components/NewPassword";
import ResetRoute from "./components/ResetRoute";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";

export default function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* 🔓 Public routes (no Body wrapper) */}
          <Route path="/api/auth/login" element={<Login />} />
          <Route path="/api/profile/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/api/profile/verify-reset-code"
            element={
              <ResetRoute>
                <VerifyResetCode />
              </ResetRoute>
            }
          />
          <Route
            path="/api/profile/reset-password"
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
            <Route path="/api/profile/edit" element={<Profile />} />
            <Route path="/api/user/connections" element={<Connections />} />
            <Route path="/api/request/review" element={<Requests/>} />
            <Route path="/api/chat/room/:id" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>

          )
        }
