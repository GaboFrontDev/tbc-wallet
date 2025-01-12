"use client";
import React from "react";
import QRCode from "react-qr-code";

import QrImage from "./QrSvg";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

type Props = {
  url: string;
  linkUrl: string;
  id: string;
}

export default async function QrTemplate({
  url,
  linkUrl,
  id,
}: Props) {
  const balance = await prisma.account_balance.findUnique({
    where: {
      account_id: id,
    },
    select: {
      current: true,
    },
  });

  const current = balance?.current;
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full">
        <QrImage link={<Link href={linkUrl}>Saldo: {current || 'no disponible'}Ver detalles</Link>}>
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
