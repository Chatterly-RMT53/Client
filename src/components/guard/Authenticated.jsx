import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Authenticated({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
