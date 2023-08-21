"use client";
import React from "react";
import QRCode from "react-qr-code";

import QrImage from "./QrSvg";
import Link from "next/link";

export default function QrTemplate({ url }: { url?: string }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full">
        <QrImage link={<Link href={url || ""}>Ver Saldo</Link>}>
          <QRCode
            size={130}
            style={{
              height: "auto",
              maxWidth: "100%",
              width: "100%",
            }}
            value={url || ""}
            viewBox={`0 0 128 128`}
          />
        </QrImage>
      </div>
    </>
  );
}
