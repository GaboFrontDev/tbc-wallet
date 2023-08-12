import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Payload = {
  id: string;
};

export async function POST(req: NextRequest) {
  const data: Payload = await req.json();

  const users = await prisma.account_balance.findFirst({
    where: {
      id: data.id,
    },
  });
  return NextResponse.json(users);
}
