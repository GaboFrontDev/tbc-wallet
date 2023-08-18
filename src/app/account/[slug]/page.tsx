import dynamic from "next/dynamic";

const GetBalanceWithParam = dynamic(() => import("@/app/components/GetBalanceWithParam"), {
  ssr: true,
  loading: () => <div>loading...</div>,
});

export default function AccountBalancePageWithId({
  params,
}: {
  params: { slug: string };
}) {
  console.log(params);
  return (
    <>

      <GetBalanceWithParam  id={params.slug} />
    </>
  );
}
