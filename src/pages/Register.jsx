import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Loader2 } from "lucide-react";
import initialize from "@/config/firebase";
import { useToast } from "@/hooks/useToast";

export default function Register() {
  const { toast } = useToast();
  const { auth } = initialize();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          toast({
            title: "Failed",
            description: "Email already in use",
            variant: "destructive",
          });
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <main
      className="justify-content-center flex h-[100vh] items-center"
      id="main"
    >
      <Card className="mx-auto w-[450px] rounded-sm p-8">
        <form onSubmit={submit}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-600">Sign up to get started</p>
          </div>
          <div className="my-8 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@mail.com"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create account
          </Button>

          <Separator className="my-8 w-full" />

          <Button asChild className="w-full" variant="outline">
            <Link to="/login">Back to login</Link>
          </Button>
        </form>
      </Card>
    </main>
  );
}
