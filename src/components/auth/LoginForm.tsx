"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseClient";
import { useRouter } from "next/navigation";
import { signIn, SignInMethod } from "@/lib/firebase/signin";
import signUp from "@/lib/firebase/signup";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

enum FormMode {
  Login,
  Register,
}

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formMode, setFormMode] = useState<FormMode>(FormMode.Login);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleAuth = async () => {
    try {
      const { user, error } = await signIn(SignInMethod.Google, {
        signupCallback: async (userCredential) => {
          // When a new user signs up, call the signup endpoint
          const response = await fetch("/api/users/signup", {
            method: "POST",
            body: JSON.stringify({
              uid: userCredential.user.uid,
              email: userCredential.user.email,
              name: userCredential.user.displayName,
            }),
          });
        },
      });
      if (user) {
        router.push("/app/dashboard");
      } else if (error) {
        toast.error(error);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("An unexpected error occurred during Google sign-in");
    }
  };

  const handleLogin = async () => {
    try {
      const { user, error } = await signIn(SignInMethod.EmailPassword, {
        credentials: {
          email,
          password,
        },
        signupCallback: async (userCredential) => {
          // When a new user signs up, call the signup endpoint
          const response = await fetch("/api/users/signup", {
            method: "POST",
            body: JSON.stringify({
              uid: userCredential.user.uid,
              email: userCredential.user.email,
              name: userCredential.user.displayName,
            }),
          });
        },
      });
      if (user) {
        router.push("/app/dashboard");
      } else if (error) {
        toast.error(error);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred during login");
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const { user, error } = await signUp(email, password);
      if (user) {
        router.push("/app/dashboard");
      } else if (error) {
        setError(error.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An unexpected error occurred during registration");
    }
  };

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent.");
    } catch (error: any) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start pt-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {formMode === FormMode.Login ? "Login" : "Register"}
          </CardTitle>
          {error && <p className="text-destructive">{error}</p>}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {formMode === FormMode.Register && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
            {formMode === FormMode.Login && (
              <Button
                variant="link"
                className="px-0"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </Button>
            )}
          </div>

          {formMode === FormMode.Login ? (
            <Button
              disabled={!email || !password || error !== null}
              onClick={handleLogin}
              className="w-full"
            >
              Login
            </Button>
          ) : (
            <Button
              disabled={!email || !password || !confirmPassword}
              onClick={handleRegister}
              className="w-full"
            >
              Register
            </Button>
          )}

          <Separator />

          <Button
            variant="outline"
            onClick={handleGoogleAuth}
            className="w-full"
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>

          <Button
            variant="ghost"
            onClick={() =>
              setFormMode(
                formMode === FormMode.Login
                  ? FormMode.Register
                  : FormMode.Login
              )
            }
            className="w-full"
          >
            {formMode === FormMode.Login
              ? "Need an account? Register"
              : "Have an account? Login"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
