import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import { SignUpForm } from "./signup-form";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign up",
};

const SignUp = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const session = await auth();
  const { callbackUrl } = await props.searchParams;
  if (session) {
    redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            Vote Vibe
          </Link>
          <CardTitle className="text-center">Sign up</CardTitle>
          <CardDescription className="text-center">
            Enter your information bellow to sign up
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
