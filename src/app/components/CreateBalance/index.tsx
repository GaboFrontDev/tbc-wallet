"use client";
import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Form from "../Form";
import Title from "../Title";
import Subtitle from "../Subtitle";
import QRCode from "react-qr-code";

interface AccountBalance {
  account_id: string;
  current: number;
}

interface AccountResponse {
  result: AccountBalance;
}

function CreateBalance({ url }: { url?: string }) {
  const [current, setCurrent] = useState("");
  const [accountID, setAccountID] = useState<string>();
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
      <div className="h-full flex items-center justify-center w-full">
        <div className="w-10/12">
          <div className="flex items-center justify-center w-full bg-gray-400/50 rounded-lg p-5 my-4 shadow-lg">
            <Form>
              <Title>Nueva Cuenta</Title>
              <Input
                type="number"
                name="balance"
                id="balance"
                className="text-black h-[60px] rounded-lg"
                placeholder="Balance de nueva cuenta"
                onChange={(e) => setCurrent(e.target.value)}
                disabled={!!accountID}
              />
              <br />
              <Button type="button" onClick={onClick} className="rounded-lg">
                Crear
              </Button>
            </Form>
          </div>
          <div className="bg-gray-400/50 rounded-lg p-5 shadow-lg">
            <div className="flex justify-center w-full">
              <div className="w-full">
                <div className="w-full">
                  <Subtitle className="text-bold">ID de Cuenta Nueva</Subtitle>
                </div>
                <div>
                  <Title className="text-[45px] text-center">{accountID}</Title>
                  <div className="flex justify-center">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBalance;
