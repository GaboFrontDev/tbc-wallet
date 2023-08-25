import dynamic from "next/dynamic";
import Title from "../components/Title";

const QrCodeScanner = dynamic(() => import("@/app/components/QrCodeScanner"), {
  ssr: false,
  loading: () => <div>Cargando lector...</div>,
});

export default async function QRPage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-11/12">
        <Title className="text-[40px]"><b>Centra tu QR</b></Title>
        <QrCodeScanner />
      </div>
    </div>
  );
}
