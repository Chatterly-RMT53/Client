import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

import initialize from "@/config/firebase";
import { signInAnonymously } from "firebase/auth";
import { useToast } from "@/hooks/useToast";

export default function Login() {
  const { auth } = initialize();
  const { toast } = useToast();

  const anonymousSignIn = () => {
    signInAnonymously(auth).catch(() => {
      toast({
        title: "Failed",
        description: "Failed to sign in anonymously",
        variant: "destructive",
      });
    });
  };

  return (
    <main
      className="justify-content-center flex h-[100vh] items-center"
      id="main"
    >
      <Card className="mx-auto w-[450px] rounded-sm p-8">
        <form>
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
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                required
              />
            </div>
          </div>
          <Button className="w-full" type="submit">
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
