"use client";

import { supabase } from "@/lib/supabase";

const Twitter = () => {
  //Twitter認証
  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: {
        //認証後にリダイレクトするURL
        redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
      },
    });
    if (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container twitter">
      <h1>X Authentication</h1>
      <h3>Create an account</h3>
      <button onClick={handleSignIn} className="gsi-material-button">
        Sign up with X
      </button>
      <h3>Already have an account?</h3>
      <button onClick={handleSignIn} className="gsi-material-button">
        Sign in with X
      </button>
    </div>
  );
};

export default Twitter;
