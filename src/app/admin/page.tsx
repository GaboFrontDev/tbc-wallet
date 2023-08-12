import dynamic from "next/dynamic";

const UpdateBalance = dynamic(() => import("@/app/components/UpdateBalance"), {
  ssr: true,
  loading: () => <div>loading...</div>,
});

export default function AdminPage() {
  return (
    <>
      Admin
      <UpdateBalance />
    </>
  );
}

