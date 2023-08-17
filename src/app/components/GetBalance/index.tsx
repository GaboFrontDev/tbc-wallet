"use client";
import { FormEvent, useState } from "react";
import Input from "../Input";

type Balance = {
  current: number;
};

function GetBalance() {
  const [clientID, setClientID] = useState("");
  const [saldo, setSaldo] = useState(0);
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    fetch(`/api/balance?client_id=${clientID}`).then(async (res) => {
      const data = (await res.json()) as Balance;
      setSaldo(data.current);
    });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="client_id"></label>
        <br />
        <Input
          type="text"
          className="text-black"
          name="client_id"
          title="client_id"
          onChange={(e) => setClientID(e.target.value)}
        />
        <br />
        <button type="submit">Consultar</button>
      </form>
      <p>{saldo}</p>
    </>
  );
}

export default GetBalance;
