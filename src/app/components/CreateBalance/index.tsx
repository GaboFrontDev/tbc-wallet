"use client";
import { useState } from "react";
import QRCode from "react-qr-code";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Button from "../Button";
import Input from "../Input";
import Form from "../Form";
import Title from "../Title";
import Subtitle from "../Subtitle";

interface AccountBalance {
  account_id: string;
  current: number;
}

interface AccountResponse {
  result: AccountBalance;
}

const flexContainerClass = "flex items-center justify-center w-full";

function CreateBalance({ url }: { url?: string }) {
  const [current, setCurrent] = useState("");
  const [phone, setPhone] = useState("");
  const [accountID, setAccountID] = useState<string>();
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const id = toast.loading("Cargando...", {
      autoClose: 3000,
    });

    const req = fetch("api/create_balance", {
      method: "POST",
      body: JSON.stringify({
        current: +current,
        phone: phone.toLowerCase(),
      }),
    });
    req.then(async (res) => {
      if (res.ok) {
        setLoading(false);
        toast.update(id, {
          render: "Cuenta creada!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setCurrent("");
        setPhone("");
      }
      const respose = (await res.json()) as AccountResponse;
      setAccountID(respose.result.account_id);
    });
  };

  const QRContainer = () => (
    <div>
      <Title className="text-[45px] text-center">{accountID}</Title>
      <div className={flexContainerClass}>
        {accountID && (
          <div className="shadow-inner bg-black/20 flex w-2/3 p-4 rounded-xl">
            <QRCode
              size={256}
              style={{
                height: "auto",
                maxWidth: "100%",
                width: "100%",
              }}
              value={`${url}/${accountID}`}
              viewBox={`0 0 128 128`}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <main className={`${flexContainerClass} h-full`}>
        <div className="w-10/12">
          <div
            className={`${flexContainerClass} bg-gray-400/50 rounded-lg p-5 my-4 shadow-lg`}
          >
            <Form>
              <Title>Nueva Cuenta</Title>
              <Input
                type="number"
                name="balance"
                id="balance"
                className="text-black h-[60px] rounded-lg"
                placeholder="Balance de nueva cuenta"
                onChange={(e) => setCurrent(e.target.value)}
              />
              <br />
              <Input
                type="text"
                name="name"
                id="name"
                className="text-black h-[60px] rounded-lg"
                placeholder="Teléfono"
                onChange={(e) => setPhone(e.target.value)}
              />
              <br />
              <Button
                type="button"
                onClick={onClick}
                className="rounded-lg"
                disabled={loading}
              >
                Crear
              </Button>
            </Form>
          </div>
          <div className="bg-gray-400/50 rounded-lg p-5 shadow-lg">
            <div className={flexContainerClass}>
              <div className="w-full">
                <div className="w-full">
                  <Subtitle className="text-bold">ID de Cuenta Nueva</Subtitle>
                </div>
                <QRContainer />
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default CreateBalance;
