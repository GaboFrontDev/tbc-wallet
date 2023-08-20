"use client";

import { FormEvent, useState } from "react";
import Input from "@/app/components/Input";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

import Button from "../Button";
import Form from "../Form";
import Title from "../Title";

type UpdateBalanceProps = {
  accountId?: string;
}

function UpdateBalanceForm({ accountId }: UpdateBalanceProps) {
  const [balance, setBalance] = useState("");
  const [usuario, setUsuario] = useState(accountId);
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (event: FormEvent) => {
    if(loading) {
      return;
    }
    event.preventDefault();
    setLoading(true);
    const apiUrl = `${window.location.origin}/api/balance`;

    const id = toast.loading("Cargando...", {
      autoClose: 1500,
    });
    const req = fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        balance: +balance,
        account_id: usuario,
        description: descripcion,
      }),
    });
    req.then(async (res) => {
      if (res?.ok) {
        setBalance("");
        setDescripcion("");
        setUsuario(accountId || "");
        setTimeout(() => {
          toast.update(id, {
            render: "Actualizado!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setLoading(false);
        }, 1500);
      } else {
        setTimeout(() => {
          toast.update(id, {
            render: "Ha habido un error!",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          setLoading(false);
        }, 1500);
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
          value={usuario}
          placeholder="Cuenta de usuario"
          disabled={!!accountId}
          onChange={(e) => !accountId && setUsuario(e.target.value)}
        />
        <br />
        <Input
          className="text-black"
          type="number"
          name="balance"
          id="balance"
          placeholder="Cantidad a descontar"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        <br />
        <Input
          className="text-black"
          type="text"
          name="description"
          id="description"
          placeholder="Descripcion del descuento"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <br />
        <Button type="submit" disabled={loading}>Actualizar</Button>
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
