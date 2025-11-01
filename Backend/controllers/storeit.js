import express from 'express';
import { supabase } from '../supabaseClient.js';
let lastUser = null;
export const getConfirmation = async (req, res) => {
  try {
    if (!lastUser) {
      return res.status(400).json({ success: false, message: "No user data found" });
    }

    const { email, password } = lastUser; 

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      return res.status(401).json({ success: false, message: error.message });
    }

   if (!data.user.email_confirmed_at) {
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: 'http://localhost:8000/api/callback',
      },
    });

    if (resendError) {
      console.error("Error resending verification email:", resendError.message);
    }

  // Then, respond to the client
  return res.status(403).json({
    success: false,
    message: "Email is not verified. A new verification link has been sent to your inbox.",
  });
}
  return res.status(200).json({success : true, message: "Valid sign up material"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const storeUser = async (req,res) => {
    const {email , password , type } = req.body ;
    lastUser = {email,password,type};
    try{
        if (type === "sign-up") {
            const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: 'http://localhost:8000/api/callback',
            },
          });

            if (error) {
                if (error.message.includes("User already registered")) {
                    return res.status(400).json(
                        {   success: false,
                            sessionReady:false,
                            reason: "alreadyExist",
                            message: error.message
                        });
                }
                return res.status(400).json(
                    {   success: false, 
                        sessionReady: false,
                        reason: "error",
                        message: error.message,
                    });
            }
      // Sign-up initiated successfully. Supabase will send a confirmation email.
      // (original flow: backend doesn't return JSON here — frontend redirects to /callback and backend stores lastUser)
            
        }
        else if (type === "sign-in") {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });

          if (error) {
            return res.status(401).json({
              success: false,
              message: "Invalid email or password"
            });
          }
            // Sign-in successful → redirect
            return res.redirect('http://localhost:3000');
          }

              }
              catch(error){
                  console.log("Error found");
              }
          }

export const getUser = (req,res) => {
    if(lastUser){
        res.json(lastUser);
    }
    else{
        res.json({ message : "no data submitted" });
    }
}