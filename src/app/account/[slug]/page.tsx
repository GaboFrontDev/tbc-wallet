import isAuthorized from "@/app/lib/isAuthorized";
import { prisma } from "@/app/lib/prisma";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const GetBalanceWithParam = dynamic(
  () => import("@/app/components/GetBalanceWithParam"),
  {
    ssr: false,
    loading: () => <div>loading...</div>,
  }
);

type TokenData = {
  is_admin?: boolean;
};
export default async function AccountBalancePageWithId({
  params,
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("session_token")?.value || "";
  const authorizedData = (await isAuthorized(sessionToken)) as TokenData;
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
      orderBy: {
        created_at: "desc",
      },
    }),
  ]);

  if(authorizedData?.is_admin) {
    redirect(`/admin/${params.slug}`)
  }

  if (!userBalance) {
    return "Esta cuenta no existe :(";
  }
  return (
    <>
      <GetBalanceWithParam
        current={userBalance?.current || 0}
        balanceHistory={balanceHistory || []}
        accountFound={true}
      />
    </>
  );
}
