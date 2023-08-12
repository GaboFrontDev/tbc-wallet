import dynamic from "next/dynamic";

const GetBalance = dynamic(() => import("@/app/components/GetBalance"), {
  ssr: true,
  loading: () => <div>loading...</div>,
});

export default function AccountBalancePage() {
  return (
    <>
      <div>Account Balance Page</div>
      <GetBalance />
    </>
  );
}
