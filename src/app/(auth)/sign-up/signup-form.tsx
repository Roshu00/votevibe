"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpUser } from "@/lib/actions/auth.actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button className="w-full" variant="default" disabled={pending}>
        {pending ? "Loading..." : "Sign Up"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input hidden name="callbackUrl" value={callbackUrl} readOnly />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue=""
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue=""
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
            defaultValue=""
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="confirmPassword"
            defaultValue=""
          />
        </div>
        <div>
          <SignInButton />
          {data && !data.success && (
            <div className="text-center text-destructive">{data.message}</div>
          )}
        </div>
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" target="_self">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};
