"use client";

import { FormEvent, useState } from "react";
import Input from "@/app/components/Input";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

import Button from "../Button";
import Form from "../Form";
import Title from "../Title";

function UpdateBalanceForm() {
  const [balance, setBalance] = useState("");
  const [usuario, setUsuario] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const id = toast.loading("Cargando...", {
      autoClose: 3000
    });
    const req = fetch("api/balance", {
      method: "POST",
      body: JSON.stringify({
        balance: +balance,
        account_id: usuario,
        description: descripcion
      }),
    });
    req.then(async (res) => {
      if (res?.ok) {
        setTimeout(() => {
          toast.update(id, {
            render: "Actualizado!",
            type: "success",
            isLoading: false,
            autoClose: 3000
          });
        }, 3000);
      } else {
        setTimeout(() => {
          toast.update(id, {
            render: "Ha habido un error!",
            type: "error",
            isLoading: false,
            autoClose: 3000
          });
        }, 3000); 
      }
    });
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Title className="my-3 mx-2">Descuento de saldo</Title>
        <Input
          className="text-black"
          type="text"
          name="usuario"
          id="usuario"
          placeholder="Cuenta de usuario"
          onChange={(e) => setUsuario(e.target.value)}
        />
        <br />
        <Input
          className="text-black"
          type="number"
          name="balance"
          id="balance"
          placeholder="Cantidad a descontar"
          onChange={(e) => setBalance(e.target.value)}
        />
        <br />
        <Input
          className="text-black"
          type="text"
          name="description"
          id="description"
          placeholder="Descripcion del descuento"
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <br />
        <Button type="submit">Actualizar</Button>
      </Form>
      <ToastContainer
        closeOnClick
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
      />
    </>
  );
}

export default UpdateBalanceForm;
