"use client";
import { format } from "date-fns";
import { es } from "date-fns/esm/locale";
import type { account_balance_history } from "@prisma/client";

import Title from "../Title";
import Subtitle from "../Subtitle";

type BalanceResponse = {
  current: number;
  balanceHistory: account_balance_history[];
  accountId: string;
};

function GetBalanceWithParam({ current, balanceHistory, accountId }: BalanceResponse) {
  return (
    <>
      <div className="h-full flex items-center justify-center w-full">
        <div className="w-10/12">
          <Title className="text-[35px] drop-shadow">
            <b>Saldo</b>
          </Title>
          <div className="bg-gray-400/50 rounded-lg p-5 shadow-lg">
            <div className="flex justify-center w-full">
              <div className="w-full">
                <div>
                  <Title className="bold text-[20px]">Usuario</Title>
                  <Subtitle className="text-[12px]">{accountId}</Subtitle>
                </div>
                <div className="h-20">
                  <div className="bg-[#2ac48a] rounded-lg shadow-xl text-center">
                    <Title className="text-[35px] drop-shadow">
                      <b>${current}.00</b>
                    </Title>
                  </div>
                  <Subtitle className="text-center">Saldo disponible</Subtitle>
                </div>
                <div className="w-full"></div>
              </div>
            </div>
          </div>
          <br />
          <Title className="text-[35px] drop-shadow">
            <b>Historial</b>
          </Title>
          <div className="bg-gray-400/50 rounded-lg p-5 shadow-lg h-[300px] overflow-auto">
            <div className="flex justify-center w-full">
              <div className="w-full">
                <div className="grid gird-cols-1 divide-y">
                  {balanceHistory.map(
                    ({ discount, created_at, description }, index) => {
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
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GetBalanceWithParam;
