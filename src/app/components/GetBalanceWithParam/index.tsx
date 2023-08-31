import { format } from "date-fns";
import { es } from "date-fns/esm/locale";
import type { account_balance_history } from "@prisma/client";

import Title from "../Title";
import Link from "next/link";
import ContainerWithShadow from "../ShadowContainer";
import FlexContainer from "../FlexContainer";

const defaultLinkClasses =
"block text-center bg-black/80 hover:bg-gray-100 hover:text-black text-white  shadow shadow-lg font-semibold py-2 px-4 my-2 rounded-full w-full";

type BalanceResponse = {
  current: number;
  balanceHistory: account_balance_history[];
  accountFound: boolean
};

function GetBalanceWithParam({
  current,
  balanceHistory,
  accountFound,
}: BalanceResponse) {


  const SaldoContainer = () => (
    <div className="flex justify-center w-full">
      <div className="w-full h-15">
        {accountFound ? (
          <div className="bg-[#2ac48a] rounded-lg shadow-xl text-center">
            <Title className="text-[35px] drop-shadow">
              <b>${current}.00</b>
            </Title>
          </div>
        ) : (
          <div className="bg-[#3c3c3c] rounded-lg shadow-xl text-center">
            <Title className="text-[20px  ] drop-shadow">
              <b>La cuenta no existe</b>
            </Title>
          </div>
        )}
      </div>
    </div>
  );

  const HistoryListContainer = () => (
    <div className="grid gird-cols-1 divide-y">
      {balanceHistory.map(({ discount, created_at, description }, index) => {
        return (
          <div key={`historial-${index}`} className="px-2">
            <div className="my-4">
              <div>
                <Title>
                  <b>
                    {format(created_at, "dd MMMMMMM yyyy", {
                      locale: es,
                    })}
                  </b>
                </Title>
              </div>
              <div className="flex justify-between">
                <div>{description}</div>
                <div>$ {discount}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const HistoryContainer = () => (
    <>
      <Title className="text-[35px] drop-shadow">
        <b>Tus Compras</b>
      </Title>
      <ContainerWithShadow className="h-[300px] overflow-auto">
        <div className="flex justify-center w-full">
          <div className="w-full">
            <HistoryListContainer />
          </div>
        </div>
      </ContainerWithShadow>
    </>
  );

  const ToScan = () => (
    <Link className={defaultLinkClasses} href={"/remove-account"}>
      <b>Escanear código</b>
    </Link>
  );

  return (
    <>
      <FlexContainer className="h-full w-full">
        <div className="w-10/12">
          <Title className="text-[35px]">
            <b>Saldo Disponible</b>
          </Title>
          <ContainerWithShadow>
            <SaldoContainer />
          </ContainerWithShadow>
          <br />
          {accountFound && <HistoryContainer />}
          {(!accountFound || current <= 0) && <ToScan />}
        </div>
      </FlexContainer>
    </>
  );
}

export default GetBalanceWithParam;
