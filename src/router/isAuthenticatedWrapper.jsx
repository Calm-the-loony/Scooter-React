import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthenticatedWrapper({ children }) {
  const selector = useSelector((state) => state.auth.isAuthenticated);

  if (selector) {
    return <div>{children}</div>;
  }

  return <Navigate to="/login" />;
}
