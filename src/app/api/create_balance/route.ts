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
  const obj = {
    current: data.current,
    account_id: uid(),
    phone: data.phone.toLowerCase(),
  };
  const balance = await prisma.account_balance.create({ data: obj });
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
