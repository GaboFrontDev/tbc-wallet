import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

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
