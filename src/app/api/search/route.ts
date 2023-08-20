import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import type { account_balance } from "@prisma/client";

type Payload = {
  searchTerm: string;
};

export async function POST(req: NextRequest) {
  const data: Payload = await req.json();
  let accounts: account_balance[];
  try {
    accounts = await prisma.account_balance.findMany({
      where: {
        phone: {
          contains: data.searchTerm,
        },
      },
    });
    req;
  } catch (e) {
    return NextResponse.json(
      {
        sucess: false,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      sucess: true,
      result: {
        accounts,
      },
    },
    {
      status: 200,
    }
  );
}
