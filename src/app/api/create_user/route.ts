import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createHash } from "node:crypto";
const prisma = new PrismaClient();

type Payload = {
  password: string;
  email: string;
};

export async function POST(req: NextRequest) {
  const data: Payload = await req.json();
  const obj = {
    password: createHash("sha256").update(data.password).digest("base64"),
    email: data.email,
    is_admin: false,
  };
  try {
    const user = await prisma.user.create({ data: obj });
    return NextResponse.json(
      {
        sucess: true,
        result: {
          ...user,
          password: null,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        sucess: false,
      },
      {
        status: 500,
      }
    );
  }
}
