"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);

      const name = formData.get("name") as string;
      const image = formData.get("image") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const { data, error } = await authClient.signUp.email({
        name,
        image,
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message ?? "Signup failed");
        toast.error(error.message)
        return;
      }

      if (data) {
        toast.success('Account created successfully! ')
        router.push('/signIn')
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Sign up with your email and password
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="image">Image URL</FieldLabel>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/image.png"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </Field>

              {errorMessage && (
                <p className="text-sm text-red-500">
                  {errorMessage}
                </p>
              )}

              {successMessage && (
                <p className="text-sm text-green-600">
                  {successMessage}
                </p>
              )}

              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>

                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link href="/signIn">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}