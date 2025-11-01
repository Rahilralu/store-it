  "use client"
  import { useEffect } from "react"
  import { z } from "zod"
  import { zodResolver } from "@hookform/resolvers/zod"
  import { useForm } from "react-hook-form"
  import { Button } from "@/components/ui/button"
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import Image from "next/image"
  import { useState } from "react"
  import Link  from "next/link"
  import { signinfn } from "./api.js";
  import { json } from "stream/consumers"
  import { signInWithGoogle,signInWithGithub } from "./supabaseClient.js";

  type FormType = "sign-in" | "sign-up"

  const authFormSchema = (formType : FormType) => {
    return z.object({
      email: z.string().email(),
      password: z.string().min(6, "Password must be at least 6 characters"),
    })
  }

  const AuthForm = ({ type }: { type: FormType }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [WrongPassword,setWrongPassword] = useState(false);
    const formSchema = authFormSchema(type);
    const [userEmail,setUserEmail] = useState("");
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        password: "",
        email: "",
      },
    })
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      signinfn({ ...values, type });
      localStorage.setItem("userEmail",values.email);

      window.location.href = "/callback";
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
    if (!mounted) return null; // Prevent mismatch on SSR

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>

          
          {/* Gives out a live stage where i can send . iT saves as email and i can send a react hook by form.watch() */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="shad-form-item">
                <FormLabel className="shad-form-label">Email</FormLabel>
                <FormControl>
                  <Input
                    className="shad-input"
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="shad-form-item">
                  <FormLabel className="shad-form-label">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="shad-input"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button 
          type="submit" 
          className="form-submit-button"
          disabled={isLoading}>
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="Loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>
          <div className="flex gap-4 w-full">
            <button
              onClick={signInWithGoogle}
              className="flex items-center justify-center gap-2 w-1/2 border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition"
            >
              <img src="/assets/images/google-icon.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>

            <button
              onClick={signInWithGithub}
              className="flex items-center justify-center gap-2 w-1/2 border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition"
            >
              <img src="/assets/images/github-icon.svg" alt="GitHub" className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>


        <div className="body-2 flex justify-between items-center">
          <Link href="/forgot-password" className="font-medium text-brand">
            Forgot password?
          </Link>

          <div className="flex items-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </div>

                </form>
              </Form>
            )
          }



export default AuthForm