import dynamic from "next/dynamic";

const UpdateBalance = dynamic(() => import("@/app/components/UpdateBalance"), {
  ssr: true,
  loading: () => <div>loading...</div>,
});

export default function AdminPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  if (!slug) {
    return "This ticket doesn't exists :(";
  }
  return <UpdateBalance accountId={slug} />;
}
