import { cookies } from "next/headers";
import { account_balance } from "@prisma/client";
import QrTemplate from "@/app/components/QrTemplate";
import isAuthorized from "../lib/isAuthorized";

export default async function QRPage() {
  const cookieStore = cookies();
  const account_token = cookieStore.get("account_token")?.value || "";
  const data = (await isAuthorized(account_token)) as account_balance;

  const props = {
    url: `${process.env.ACCOUNT_BALANCE_URL}/${data.account_id}`,
    linkUrl: process.env.ACCOUNT_BALANCE_URL || "",
    id: data.account_id,
  }

  return (
    <QrTemplate {...props} />
  );
}
