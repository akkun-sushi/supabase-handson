"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Email = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //サインイン
  const signIn = async () => {
    //入力項目確認
    if (!email || !password) {
      setMessage("All fields are required!");
      return;
    }
    //emailとpasswordでサインイン
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      //ページ遷移
      router.push("/dashboard");
    }
  };

  //サインアップ
  const signUp = async () => {
    //入力項目確認
    if (!email || !password) {
      setMessage("All fields are required!");
      return;
    }
    //emailとpasswordでサインアップ
    const { error } = await supabase.auth.signUp({
      email,
      password,
      //ユーザーが確認リンクをクリックした後にリダイレクトするURLを指定
      options: {
        emailRedirectTo: "http://localhost:3000/dashboard",
      },
    });
    if (error) {
      setMessage(error.message);
    } else {
      //確認メール
      setMessage(
        "Signed up successfully! Please check your email for confirmation."
      );
    }
  };

  //パスワードリセット
  const passwordReset = async () => {
    const { data: confirmedEmail } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    //入力されたメールとデータベースに記録されたメールが一致している場合
    if (confirmedEmail?.length === 1) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/passwordReset",
      });
      if (error) {
        console.error("Error sending password reset email:", error.message);
        setMessage("You are changing your password too frequently.");
      } else {
        setMessage("Please check your email for a password reset link.");
      }
    } else {
      setMessage("Email does not match the registered email.");
    }
  };

  //認証状態の変更を監視するリスナー設定
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        //ユーザーがサインインして、セッションが存在する場合
        if (event === "SIGNED_IN" && session) {
          const { user } = session;
          //データベースからサインインしたidと一致するレコードを取得
          const { data: firstSignIn } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id);
          //初回サインイン（＝サインアップ）時はデータベースにidとemailを記録
          if (firstSignIn?.length === 0) {
            const { error } = await supabase
              .from("users")
              .insert([{ id: user.id, email: user.email }]);
            if (error) {
              console.error(
                "Error inserting user into database:",
                error.message
              );
            } else {
              console.log("User inserted into database successfully!");
            }
          }
        }
      }
    );

    return () => {
      //コンポーネントがアンマウントされる際に、リスナーを解除
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="container email">
      <div className="text">
        <h1 className="email-text">Email Authentication</h1>
      </div>
      <div className="form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div className="button-message">
        <div className="button-container">
          <button onClick={signIn} className="gsi-material-button email-button">
            Sign In
          </button>
          <button onClick={signUp} className="gsi-material-button email-button">
            Sign Up
          </button>
          <button
            onClick={passwordReset}
            className="gsi-material-button email-button"
          >
            Password Reset
          </button>
        </div>
        <h3 className="message">{message}</h3>
      </div>
    </div>
  );
};

export default Email;
