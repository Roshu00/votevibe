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
import { SigninForm } from "./credentials-form";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in",
};

const SignIn = async (props: {
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
          <CardTitle className="text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SigninForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
