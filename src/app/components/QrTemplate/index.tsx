import Image from "next/image";
import QrImage from "./QrSvg";
import QRCode from "react-qr-code";

export default function QrTemplate({ id, url }: { id?: string; url?: string }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full">
        <QrImage>
          <QRCode
            size={130}
            style={{
              height: "auto",
              maxWidth: "100%",
              width: "100%",
            }}
            value={`${url}/${id}`}
            viewBox={`0 0 128 128`}
          />
        </QrImage>
      </div>
    </>
  );
}
