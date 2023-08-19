import dynamic from "next/dynamic";

const UpdateBalance = dynamic(() => import("@/app/components/UpdateBalance"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});

export default function AdminPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  if (!slug) {
    return "Esta cuenta no existe :(";
  }
  return (
    <>
      <div className="flex justify-center items-center h-full w-8/12">
        <UpdateBalance accountId={slug} />
      </div>
    </>
  );
}
