"use client";

import { supabase } from "@/lib/supabase";

const Github = () => {
  //Github認証
  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
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
    <div className="container github">
      <h1>Github Authentication</h1>
      <h3>Create an account</h3>
      <button onClick={handleSignIn} className="gsi-material-button">
        Sign up with Github
      </button>
      <h3>Already have an account?</h3>
      <button onClick={handleSignIn} className="gsi-material-button">
        Sign in with Github
      </button>
    </div>
  );
};

export default Github;
