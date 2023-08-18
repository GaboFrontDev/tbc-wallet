import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ERROR_JSON = {
  success: false,
  result: {
    error: "Sin suficiente saldo",
  },
};

type Payload = {
  balance: number;
  account_id: string;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const account_id = searchParams.get("client_id") || "";
  const balance = await prisma.account_balance.findUnique({
    where: {
      account_id,
    },
    select: {
      current: true,
    },
  });
  return NextResponse.json(balance);
}

export async function POST(req: NextRequest) {
  const data: Payload = await req.json();
  const obj = {
    current: data.balance,
    account_id: data.account_id,
  };
  const account = await prisma.account_balance.findUnique({
    where: {
      account_id: obj.account_id,
    },
  });
  if (account?.current && account?.current < 0) {
    return NextResponse.json(ERROR_JSON, {
      status: 400,
    });
  }
  if (data.balance <= 0) {
    return NextResponse.json(ERROR_JSON, {
      status: 400,
    });
  }
  if (account?.current && account?.current - data.balance < 0) {
    return NextResponse.json(ERROR_JSON, {
      status: 400,
    });
  }
  const balance = await prisma.account_balance.update({
    where: {
      account_id: obj.account_id,
    },
    data: {
      current: (account?.current || 0) - data.balance,
    },
  });
  return NextResponse.json({
    success: true,
    result: balance,
  });
}
