import dynamic from "next/dynamic";
import Title from "../components/Title";
import FlexContainer from "../components/FlexContainer";

const QrCodeScanner = dynamic(() => import("@/app/components/QrCodeScanner"), {
  ssr: false,
  loading: () => <div>Cargando lector...</div>,
});

export default async function QRPage() {
  return (
    <FlexContainer className="w-full h-full">
      <div className="w-11/12">
        <Title className="text-[40px]"><b>Centra tu QR</b></Title>
        <QrCodeScanner />
      </div>
    </FlexContainer>
  );
}
