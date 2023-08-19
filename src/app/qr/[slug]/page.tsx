import dynamic from "next/dynamic";

const QrTemplate = dynamic(() => import("@/app/components/QrTemplate"), {
    ssr: false,
    loading: () => <div>loading...</div>,
  });
  

export default async function QrCodePage({
  params: {slug},
}: {
  params: { slug: string };
}) {

  if (!slug) {
     return "Esta cuenta no existe :("
  }
  return (
    <>
      <QrTemplate
        id={slug}
        url={process.env.ACCOUNT_BALANCE_URL}
      />
    </>
  );
}
