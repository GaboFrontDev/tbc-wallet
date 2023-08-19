"use client";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.min.css";

import Input from "../Input";
import Button from "../Button";
import Form from "../Form";
import Title from "../Title";


function GetBalance() {
  const router = useRouter();
  const [clientID, setClientID] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    toast.loading("Cargando...");
    fetch(`/api/balance?client_id=${clientID}`).then(async (res) => {
      if(res.ok) {
        router.push(`account/${clientID}`);
      }
    });
  };


  return (
    <>
      <Form onSubmit={onSubmit}>
        <Title className="my-3 mx-2">Saldo</Title>
        <Input
          type="text"
          className="text-black"
          name="client_id"
          title="client_id"
          onChange={(e) => setClientID(e.target.value)}
        />
        <br />
        <Button type="submit">Consultar</Button>
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

export default GetBalance;
