import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
}
