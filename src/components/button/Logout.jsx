import { signOut } from "firebase/auth";
import { Button } from "../ui/button";
import initialize from "@/config/firebase";

export default function Logout() {
  const { auth } = initialize();
  return (
    <Button
      onClick={() => {
        signOut(auth);
      }}
    >
      Logout
    </Button>
  );
}
