import { onAuthStateChanged } from "firebase/auth";
import { createContext } from "react";
import initialize from "@/config/firebase";
import { useLocalStorage } from "@uidotdev/usehooks";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { auth } = initialize();
  const [user, setUser] = useLocalStorage("user", null);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
