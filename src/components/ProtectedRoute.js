// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

// Wrap any route element in <ProtectedRoute> to require a signed-in user.
// If the user is NOT authenticated, they are sent to /login and nowhere else.
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // "replace" prevents the protected URL from staying in the history stack.
    return <Navigate to="/login" replace />;
  }

  return children;
}