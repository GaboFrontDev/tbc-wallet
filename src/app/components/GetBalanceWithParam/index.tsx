"use client";
import { useEffect, useState } from "react";

type BalanceResponse = {
  current: number;
  balanceHistory: {
    discount: string;
  }[];
};

type GetBalanceProps = {
  id: string;
};

function GetBalanceWithParam({ id }: GetBalanceProps) {
  const [saldo, setSaldo] = useState(0);
  const [historial, setHistorial] = useState<
    {
      discount: string;
    }[]
  >([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    fetch(`/api/balance?client_id=${id}`).then(async (res) => {
      const data = (await res.json()) as BalanceResponse;
      setSaldo(data?.current);
      console.log(data);
      setHistorial(data?.balanceHistory);
    });
  }, [id]);

  return (
    <>
      <h1>Tu saldo: </h1>
      <p>{saldo}</p>
      <h2>Historial</h2>
      <ol>
        {historial?.map(({ discount }, index) => {
          return <li key={`historial-${index}`}>Compra registrada por {discount}</li>;
        })}
      </ol>
    </>
  );
}

export default GetBalanceWithParam;
