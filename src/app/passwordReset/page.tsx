"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const passwordReset = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length > 5) {
      if (password === confirmed) {
        setMessage("The password has been changed successfully!");
        await supabase.auth.updateUser({ password }); //パスワード変更
        router.push("/");
      } else {
        setMessage("Password do not match.");
      }
    } else {
      setMessage("The password must be at least six characters.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <input
          type="password"
          value={confirmed}
          onChange={(e) => setConfirmed(e.target.value)}
          placeholder="confirmed"
          required
        />
        <button type="submit">submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default passwordReset;
