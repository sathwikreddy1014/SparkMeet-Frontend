import { Navigate } from "react-router-dom";

const ResetRoute = ({ children }) => {
  const email = localStorage.getItem("forgotEmail");
  const resetSession = localStorage.getItem("resetSession");

  if (email && resetSession === "true") {
    return children; // ✅ allowed
  }

  return <Navigate to="/login" replace />; // ❌ redirect if not allowed
};

export default ResetRoute;
