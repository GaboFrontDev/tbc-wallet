"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Button from "../Button";
import Input from "../Input";
import Form from "../Form";
import Title from "../Title";
import Subtitle from "../Subtitle";
import type { account_balance } from "@prisma/client";
import ContainerWithShadow from "../ShadowContainer";
import FlexContainer from "../FlexContainer";

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<account_balance[]>();

  const onClick = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const id = toast.loading("Loading...", {
      autoClose: 3000,
    });

    const req = fetch("api/search", {
      method: "POST",
      body: JSON.stringify({
        searchTerm: searchTerm.toLowerCase(),
      }),
    });

    req.then((res) => {
      setTimeout(async () => {
        setLoading(false);
        if (res?.ok) {
          toast.update(id, {
            render: "Listo!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
          toast.update(id, {
            render: "Ha habido un error!",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          return;
        }
        const data = (await res.json()).result.accounts as account_balance[];

        setAccounts(data);
      }, 1000);
    });
  };

  const AccountsContainer = () => (
    <ContainerWithShadow>
      <FlexContainer>
        <div className="w-full">
          <div className="w-full">
            <Subtitle className="text-bold">Cuentas encontradas</Subtitle>
            {accounts?.map(({ phone, account_id, current }) => (
              <p key={`account-${account_id}`}>
                {phone} {account_id} ${current}
              </p>
            ))}
          </div>
        </div>
      </FlexContainer>
    </ContainerWithShadow>
  );

  return (
    <>
      <FlexContainer className="h-full">
        <div className="w-10/12">
          <FlexContainer withShadow>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                onClick();
              }}
            >
              <Title>Busqueda de cuenta</Title>
              <Input
                type="text"
                name="phone"
                id="phone"
                className="text-black h-[60px] rounded-lg"
                placeholder="Telefono"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <br />
              <Button
                type="button"
                onClick={onClick}
                className="rounded-lg"
                disabled={loading}
              >
                Buscar
              </Button>
            </Form>
          </FlexContainer>
          {accounts && <AccountsContainer />}
        </div>
      </FlexContainer>
      <ToastContainer />
    </>
  );
}
