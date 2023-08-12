"use client";

import { FormEvent, useState } from "react";

function UpdateBalanceForm() {
  const [balance, setBalance] = useState("");
  const [usuario, setUsuario] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const req = fetch("api/balance", {
      method: "POST",
      body: JSON.stringify({
        balance: +balance,
        account_id: usuario,
      }),
    });
    req.then(async (res) => {});
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="usuario">Usuario</label>
        <input
          className="text-black"
          type="text"
          name="usuario"
          id="usuario"
          onChange={(e) => setUsuario(e.target.value)}
        />
        <br />
        <label htmlFor="balance">Descuento</label>
        <input
          className="text-black"
          type="number"
          name="balance"
          id="balance"
          placeholder="$"
          onChange={(e) => setBalance(e.target.value)}
        />
        <br />
        <button type="submit">Actualizar</button>
      </form>
    </>
  );
}

export default UpdateBalanceForm;
