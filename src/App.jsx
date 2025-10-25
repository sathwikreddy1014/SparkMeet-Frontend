import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appstore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

import VerifyResetCode from "./components/VerifyResetCode";
import ForgotPassword from "./components/ForgotPassword";
import NewPassword from "./components/NewPassword";
import ResetRoute from "./components/ResetRoute";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import TermsAndConditions from "./components/PrivacyPolicy";
import PrivacyPolicy from "./components/PrivacyPolicy";
import PremiumPlans from "./components/PremiumPlans";

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
          <Route 
          path = "/privacy-policy"
          element = {
            <PrivacyPolicy/>
          }/>

          <Route 
          path = "/terms&conditions"
          element = {
            <TermsAndConditions/>
          }/>

          {/* 🔒 Private routes (with Body wrapper) */}
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="/edit" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/request/review" element={<Requests/>} />
            <Route path="/room/:id" element={<Chat />} />
            <Route path = "/premiunplans" element= {<PremiumPlans/>}/>
          </Route> 
        </Routes>
      </BrowserRouter>
    </Provider>

          )
        }
