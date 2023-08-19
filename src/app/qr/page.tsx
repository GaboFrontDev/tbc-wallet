import dynamic from "next/dynamic";

const QrTemplate = dynamic(() => import("@/app/components/QrTemplate"), {
  ssr: true,
  loading: () => <div>loading...</div>,
});

export default function QRPage() {
  return (
    <>
      <QrTemplate></QrTemplate>
    </>
  );
}
