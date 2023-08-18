"use client";
import { useEffect, useState } from "react";

type Balance = {
  current: number;
};

type GetBalanceProps = {
  id: string;
};

function GetBalanceWithParam({id}: GetBalanceProps) {
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    if(!id) {
      return;
    }
    fetch(`/api/balance?client_id=${id}`).then(async (res) => {

      const data = (await res.json()) as Balance;
      setSaldo(data?.current);
    });
  })

  return (
      <p>{saldo}</p>
  );
}

export default GetBalanceWithParam;
