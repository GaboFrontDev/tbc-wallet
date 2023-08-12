"use client";
import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';

function LoginForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendUser = (event: FormEvent) => {
    event.preventDefault()
    const req = fetch(isLogin ? "api/login" : "api/create_user", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    req.then(async (res) => {
      const data = await res.json();
      const cookies = new Cookies();
      if(data.result?.token) {
        cookies.set("session_token", data.result?.token);
        router.push("/admin");
      }
    });
  };

  return (
    <>
      <form onSubmit={sendUser}>
        <h1>{isLogin ? "Login" : "Create Account"}</h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          className="text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button type="submit">Send</button>
      </form>
      <button
        type="button"
        className="btn"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Create Account" : "I have an Account"}
      </button>
    </>
  );
}

export default LoginForm;
