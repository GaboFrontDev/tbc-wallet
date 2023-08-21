import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { createHash } from "node:crypto";
import { createLoginToken } from "@/app/lib/tokenUtils";

type Payload = {
  password: string;
  email: string;
};

export async function POST(req: NextRequest) {
  const data: Payload = await req.json();
  const obj = {
    email: data.email,
    password: createHash("sha256").update(data.password).digest("base64"),
  };
  let user = null;
  try {
    user = await prisma.user.findUniqueOrThrow({
      where: {
        email: obj.email,
      },
    });
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
  if (obj.password !== user.password) {
    return NextResponse.json(
      {
        sucess: false,
      },
      {
        status: 401,
      }
    );
  }
  const token = await createLoginToken(user);
  return NextResponse.json(
    {
      sucess: true,
      result: {
        token,
      },
    },
    {
      status: 200,
    }
  );
}
