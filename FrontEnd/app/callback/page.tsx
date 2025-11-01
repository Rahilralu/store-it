"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(120)
  const [status, setStatus] = useState("Verifying your account...");
  
  const val = async () => {    
      const res = await fetch('http://localhost:7000/api/callback', {
          method : "GET",
          headers : { "Content-Type" : 'application/json'},
      })
      return res.json();
  }
  const recheck = async () => {
      const { success , message} = await val();
      if(success){
        setStatus("Login successful! Redirecting...");
        setTimeout(() => router.push("/"), 1500);
      }
  }
  useEffect(() => {
    const checkSession = async () => {
      const { success, message } = await val();

      if (success) {
        setStatus("Login successful! Redirecting...");
        setTimeout(() => router.push("/"), 1500);
      }
      else if (!success && message === "Email not confirmed"){
        const id = setInterval(() => {
            setTimeLeft(prev => {
              const next = prev - 1;
              if (next % 5 === 0) recheck();
              setStatus(`Check your email and confirm the email (${next}s left)`);

              if (next <= 0) {
                clearInterval(id);
                router.push("/sign-up");
              }
              return next;
            });
          },1000);  
      }
      else {
        setStatus(message);
        setTimeout(() => router.push("/sign-up"), 1500);
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-xl font-medium mb-3">{status}</h2>
      <p className="text-gray-500">Please wait while we verify your session...</p>
    </div>
  );
}
