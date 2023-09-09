"use client";
import React from "react";
import QRCode from "react-qr-code";

import QrImage from "./QrSvg";
import Link from "next/link";

export default function QrTemplate({
  url,
  linkUrl,
}: {
  url?: string;
  linkUrl: string;
}) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full">
        <QrImage link={<Link href={""}>My event name</Link>}>
          <QRCode
            size={200}
            style={{
              height: "auto",
              maxWidth: "100%",
              width: "100%",
            }}
            value={url || ""}
            viewBox={`0 0 150 150`}
          />
        </QrImage>
      </div>
    </>
  );
}
