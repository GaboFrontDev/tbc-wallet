import { prisma } from "@/app/lib/prisma";
import dynamic from "next/dynamic";

const GetBalanceWithParam = dynamic(
  () => import("@/app/components/GetBalanceWithParam"),
  {
    ssr: true,
    loading: () => <div>loading...</div>,
  }
);

export default async function AccountBalancePageWithId({
  params,
}: {
  params: { slug: string };
}) {
  const [userBalance, balanceHistory] = await Promise.all([
    prisma.account_balance.findUnique({
      where: {
        account_id: params.slug,
      },
      select: {
        current: true,
      },
    }),
    prisma.account_balance_history.findMany({
      where: {
        account_id: params.slug,
      },
    }),
  ]);

  if (!userBalance) {
     return "Esta cuenta no existe :("
  }
  return (
    <>
      <GetBalanceWithParam
        current={userBalance?.current || 0}
        balanceHistory={balanceHistory || []}
      />
    </>
  );
}
