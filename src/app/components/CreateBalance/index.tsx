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
import ContainerWithShadow from "../ShadowContainer";
import FlexContainer from "../FlexContainer";

interface AccountBalance {
  account_id: string;
  current: number;
}

interface AccountResponse {
  result: AccountBalance;
}

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
    <FlexContainer className="my-2">
      <div className="shadow-inner bg-black/20 flex w-3/3 p-3 rounded-xl">
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
    </FlexContainer>
  );

  return (
    <>
      <FlexContainer className="h-full" tag="main">
        <div className="w-10/12">
          <Title className="text-[30px]">Nueva Cuenta</Title>
          <FlexContainer className="my-2" withShadow>
            <Form>
              <Input
                type="number"
                name="balance"
                id="balance"
                className="text-black h-[60px] rounded-lg"
                placeholder="Saldo de nueva cuenta"
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
          </FlexContainer>
          {accountID?.length && (
            <ContainerWithShadow>
              <FlexContainer>
                <div className="w-full">
                  <div className="w-full">
                    <Subtitle className="text-bold">QR Cuenta Nueva</Subtitle>
                  </div>
                  <QRContainer />
                </div>
              </FlexContainer>
            </ContainerWithShadow>
          )}
        </div>
      </FlexContainer>
      <ToastContainer />
    </>
  );
}

export default CreateBalance;
