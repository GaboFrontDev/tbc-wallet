"use client";
import "react-toastify/dist/ReactToastify.min.css";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";

import Input from "../Input";
import Button from "../Button";
import Title from "../Title";
import Form from "../Form";

function LoginForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendUser = (event: FormEvent) => {
    event.preventDefault();
    if (!email.length || !password.length) {
      toast.error("Aun quedaron campos vacíos");
      return;
    }
    const id = toast.loading("Cargando...");

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
      if (data.result?.token) {
        cookies.set("session_token", data.result?.token, {
          secure: true,
        });
        router.refresh();
      } else {
        setTimeout(() => {
          toast.update(id, {
            render: "Ha habido un error!",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }, 3000);
      }
    });
  };

  return (
    <div className="h-full flex items-center justify-center w-full">
      <div className="w-8/12">
        <div className="flex items-center justify-center w-full">
          <Form onSubmit={sendUser}>
            <Title className="my-5 mx-2 text-[45px]">
              {isLogin ? "Login" : "Crear Cuenta"}
            </Title>
            <Input
              type="text"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              className="my-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <Input
              type="password"
              name="password"
              id="password"
              className="my-2"
              placeholder="****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            <Button type="submit" className="w-full">
              Enviar
            </Button>
          </Form>
        </div>
        <div className="flex items-center justify-center">
          <Button
            type="button"
            className="w-full"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Crear Cuenta Administrador" : "Soy Administrador"}
          </Button>
        </div>
      </div>
      <ToastContainer
        closeOnClick
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default LoginForm;
