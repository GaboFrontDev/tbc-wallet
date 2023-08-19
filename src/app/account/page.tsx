import dynamic from "next/dynamic";

const GetBalance = dynamic(() => import("@/app/components/GetBalance"), {
  ssr: true,
  loading: () => <div>loading...</div>,
});

export default function AccountBalancePage() {
  return (
    <>
      <div className="flex justify-center items-center h-full w-8/12">
        <GetBalance />
      </div>
    </>
  );
}
