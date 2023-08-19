"use client";
import { FormEvent, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Form from "../Form";
import Subtitle from "../Subtitle";
import type { account_balance_history } from "@prisma/client";
import Title from "../Title";

type Balance = {
  current: number;
  balanceHistory: account_balance_history[];
};


function GetBalance() {
  const [clientID, setClientID] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [historial, setHistorial] = useState<account_balance_history[]>([]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    fetch(`/api/balance?client_id=${clientID}`).then(async (res) => {
      const data = (await res.json()) as Balance;
      setSaldo(data?.current);
      setHistorial(data?.balanceHistory);
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
      <Subtitle>{saldo}</Subtitle>
      <ol>
        {historial.map(({ discount }, index) => {
          return <li key={`historial-${index}`}>Descuento registrada por la cantidad de {discount}</li>;
        })}
      </ol>
    </>
  );
}

export default GetBalance;
