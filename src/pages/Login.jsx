import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

import initialize from "@/config/firebase";
import { signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/hooks/useToast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Login() {
  const { auth } = initialize();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        if (err.code == "auth/invalid-email") {
          toast({
            title: "Failed",
            description: "Email is invalid",
            variant: "destructive",
          });
        } else if (err.code == "auth/user-not-found") {
          toast({
            title: "Failed",
            description: "User is not registered",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Failed",
            description: "Failed to sign in",
            variant: "destructive",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const anonymousSignIn = () => {
    setIsLoading(true);
    signInAnonymously(auth)
      .catch(() => {
        toast({
          title: "Failed",
          description: "Failed to sign in anonymously",
          variant: "destructive",
        });
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
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to your account
            </p>
          </div>
          <div className="my-8 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@mail.com"
                value={email}
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>
        <div className="my-8 flex w-full items-center justify-center gap-x-4">
          <Separator className="flex-1" />
          <p className="text-sm text-neutral-600">Or Continue With</p>
          <Separator className="flex-1" />
        </div>
        <div className="flex gap-x-4">
          <Button className="w-full" variant="outline" asChild>
            <Link to="/register">Register</Link>
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => anonymousSignIn()}
          >
            Anonymous
          </Button>
        </div>
      </Card>
    </main>
  );
}
