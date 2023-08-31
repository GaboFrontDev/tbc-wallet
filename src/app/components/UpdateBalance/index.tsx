"use client";

import { FormEvent, useState } from "react";
import Input from "@/app/components/Input";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

import Button from "../Button";
import Form from "../Form";
import Title from "../Title";
import QrCodeScanner from "../QrCodeScanner";
import FlexContainer from "../FlexContainer";

type UpdateBalanceProps = {
  accountId?: string;
};


function UpdateBalanceForm({ accountId }: UpdateBalanceProps) {
  const [balance, setBalance] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (event: FormEvent) => {
    if (loading) {
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
        account_id: accountId,
        description: descripcion,
      }),
    });
    req.then(async (res) => {
      if (res?.ok) {
        setTimeout(() => {
          setBalance("");
          setDescripcion("");
          toast.update(id, {
            render: "Actualizado!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setLoading(false);
          setTimeout(() => {
            location.href = "../admin";
          }, 2000);
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
      <FlexContainer className="h-full  w-full" tag="main">
        {!accountId && (
          <div className="w-11/12">
            <Title className="text-[40]">Escanea Cuenta</Title>
            <QrCodeScanner url="admin" />
          </div>
        )}
        {accountId && (
          <FlexContainer className="w-11/12" withShadow>
            <>
              <Form onSubmit={onSubmit}>
                <Title className="my-3 mx-2">Descuento de saldo</Title>
                <Input
                  className="text-black h-[60px] rounded-lg"
                  type="number"
                  name="balance"
                  id="balance"
                  placeholder="Cantidad a descontar"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                />
                <br />
                <Input
                  className="text-black h-[60px] rounded-lg"
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Descripcion del descuento"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                <br />
                <Button type="submit" disabled={loading}>
                  Actualizar
                </Button>
              </Form>
              <ToastContainer
                closeOnClick
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
              />
            </>
          </FlexContainer>
        )}
      </FlexContainer>
    </>
  );
}

export default UpdateBalanceForm;
