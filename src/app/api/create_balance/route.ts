import ShortUniqueId from "short-unique-id";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

type Payload = {
  current: number;
  phone: string;
};

export async function GET(Request: NextRequest) {
  const users = await prisma.account_balance.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const uid = new ShortUniqueId({
    length: 8,
  });
  const data: Payload = await req.json();
  const obj: {
    current: number;
    account_id: string;
    phone: string;
    promoId: string | null;
  } = {
    current: data.current,
    account_id: uid(),
    phone: data.phone.toLowerCase(),
    promoId: null,
  };
  console.log({ obj });
  const promo = await prisma.promociones.findFirst({
    where: {
      expires_at: {
        gt: new Date(),
      },
      cantidad_promo: {
        gt: 0,
      },
      rango: {
        lte: obj.current,
      },
    },
  });
  if (promo) {
    obj.promoId = promo.id;
    await prisma.promociones.update({
      where: {
        id: promo.id,
      },
      data: {
        cantidad_promo: promo.cantidad_promo - 1,
      },
    });
  }
  const balance = await prisma.account_balance.create({
    data: obj,
    select: {
      id: true,
      account_id: true,
      current: true,
    },
  });
  await prisma.account_balance_history.create({
    data: {
      account_id: balance.account_id,
      discount: balance.current,
      description: "Apertura de cuenta",
    },
  });
  return NextResponse.json(
    {
      success: true,
      result: balance,
    },
    {
      status: 201,
    }
  );
}
