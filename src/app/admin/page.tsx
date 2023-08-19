import dynamic from "next/dynamic";

const UpdateBalance = dynamic(() => import("@/app/components/UpdateBalance"), {
  ssr: true,
  loading: () => <div>loading...</div>,
});

export default function AdminPage() {
  return (
    <>
      <div className="flex justify-center items-center h-full w-8/12">
        <UpdateBalance />
      </div>
    </>
  );
}

