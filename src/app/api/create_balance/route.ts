import ShortUniqueId from "short-unique-id";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Payload = {
  current: number;
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
