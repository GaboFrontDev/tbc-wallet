"use client";
import React from "react";
import QRCode from "react-qr-code";

import QrImage from "./QrSvg";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

type Props = {
  url: string;
  linkUrl: string;
  balance: number;
}

export default async function QrTemplate({
  url,
  linkUrl,
  balance,
}: Props) {
  const current = balance;
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full">
        <QrImage link={<Link href={linkUrl}>Ver detalles y saldo</Link>}>
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
