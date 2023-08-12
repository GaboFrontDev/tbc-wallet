"use client";
import { useState } from "react";

interface AccountBalance {
  account_id: string;
  current: number;
}

interface AccountResponse {
  result: AccountBalance;
}

function CreateBalance() {
  const [current, setCurrent] = useState("");
  const [accountID, setAccountID] = useState("");
  const onClick = () => {
    const req = fetch("api/create_balance", {
      method: "POST",
      body: JSON.stringify({
        current: +current,
      }),
    });
    req.then(async (res) => {
      const respose = (await res.json()) as AccountResponse;
      setAccountID(respose.result.account_id);
    });
  };

  return (
    <>
      <form>
        <label htmlFor="balance">Balance nueva cuenta</label>
        <br />
        <input
          type="number"
          name="balance"
          id="balance"
          className="text-black"
          placeholder="$"
          onChange={(e) => setCurrent(e.target.value)}
        />
        <br />
        <button type="button" onClick={onClick}>
          Crear Nueva Cuenta
        </button>
      </form>
      {accountID.length && <p>ID de nueva cuenta: {accountID}</p>}
    </>
  );
}

export default CreateBalance;
