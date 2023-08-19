import Image from "next/image";
import QrImage from "./qr_image.png";
import QRCode from "react-qr-code";

export default function QrTemplate({ id, url }: { id?: string; url?: string }) {
  return (
    <>
      <div className="fixed top-0 left-0">
        <Image src={QrImage} alt=""></Image>
      </div>
      <div className="fixed left-0 h-screen w-screen bg-transparent flex items-center justify-center top-[-7vh]">
        <div className="w-1/3 p-4 bg-transparent">
            <QRCode
                size={256}
                style={{
                height: "auto",
                maxWidth: "100%",
                width: "100%",
                }}
                value={`${url}/${id}`}
                viewBox={`0 0 128 128`}
            />
            </div>

      </div>
    </>
  );
}
