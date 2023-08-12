import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createHash } from "node:crypto";
import { SignJWT } from "jose";
const prisma = new PrismaClient();

type Payload = {
  password: string;
  email: string;
};

export async function POST(req: NextRequest) {
  const data: Payload = await req.json();
  const privateKey = process.env["JWT_SECRET"] || "";
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
  if (!privateKey.length) {
    console.log("Error: setup a JWT_SECRET in ENV");
  }
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60; // one hour
  const token = await new SignJWT({
    data: {
      ...user,
      password: null,
    },
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(privateKey));
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
