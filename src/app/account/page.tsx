import { cookies } from "next/headers";
import { account_balance } from "@prisma/client";
import GetBalance from "@/app/components/GetBalance";
import GetBalanceWithParam from "@/app/components/GetBalanceWithParam";

import isAuthorized from "../lib/isAuthorized";
import { prisma } from "../lib/prisma";

export default async function AccountBalancePage() {
  const cookieStore = cookies();
  const account_token = cookieStore.get("account_token")?.value || "";
  const data = (await isAuthorized(account_token)) as account_balance;
  if (!data?.account_id) {
    return (
      <div className="flex justify-center items-center h-full w-8/12">
        <GetBalance />
      </div>
    );
  }
  return <BalanaceWithParam data={data} token={account_token} />;
}

async function BalanaceWithParam({
  data,
  token,
}: {
  data: account_balance;
  token: string;
}) {
  const [userBalance, balanceHistory] = await Promise.all([
    prisma.account_balance.findUnique({
      where: {
        account_id: data?.account_id,
      },
      select: {
        current: true,
      },
    }),
    prisma.account_balance_history.findMany({
      where: {
        account_id: data?.account_id,
      },
      orderBy: {
        created_at: "desc",
      },
    }),
  ]);
  return (
    <GetBalanceWithParam
      current={userBalance?.current || 0}
      balanceHistory={balanceHistory || []}
      accountId={data.account_id}
    />
  );
}
