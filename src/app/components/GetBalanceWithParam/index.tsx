import { format } from "date-fns";
import { es } from "date-fns/esm/locale";
import type { account_balance_history } from "@prisma/client";

import Title from "../Title";
import Subtitle from "../Subtitle";

type BalanceResponse = {
  current: number;
  balanceHistory: account_balance_history[];
};

function GetBalanceWithParam({
  current,
  balanceHistory,
}: BalanceResponse) {


  const SaldoContainer = () => (
    <div className="flex justify-center w-full">
      <div className="w-full h-15">
        <div className="bg-[#2ac48a] rounded-lg shadow-xl text-center">
          <Title className="text-[35px] drop-shadow">
            <b>${current}.00</b>
          </Title>
        </div>
      </div>
    </div>
  );

  const HistoryContainer = () => (
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

  return (
    <>
      <div className="h-full flex items-center justify-center w-full">
        <div className="w-10/12">
          <Title className="text-[35px] drop-shadow">
            <b>Saldo Disponible</b>
          </Title>
          <div className="bg-gray-400/50 rounded-lg p-5 shadow-lg">
            <SaldoContainer />
          </div>
          <br />
          <Title className="text-[35px] drop-shadow">
            <b>Historial</b>
          </Title>
          <div className="bg-gray-400/50 rounded-lg p-5 shadow-lg h-[300px] overflow-auto">
            <div className="flex justify-center w-full">
              <div className="w-full">
                <HistoryContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GetBalanceWithParam;
