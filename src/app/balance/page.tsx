import dynamic from "next/dynamic";

const CreateBalance = dynamic(() => import("@/app/components/CreateBalance"), {
  ssr: true,
  loading: () => <div>loading...</div>,
});

export default function CreateBlanace() {
  return (
    <>
      <CreateBalance />
    </>
  );
}

