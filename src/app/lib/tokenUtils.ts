import { SignJWT } from "jose";

import type { user } from "@prisma/client";

const privateKey = process.env["JWT_SECRET"] || "";

export const createLoginToken = async (data: user) => {
    if (!privateKey.length) {
      console.log("Error: setup a JWT_SECRET in ENV");
    }
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60; // one hour
    const token = await new SignJWT({
      data: {
        ...data,
        password: null,
      },
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(privateKey));
    return token;
  };
  
  export const createAccountToken = async (account_id: string) => {
    if (!privateKey.length) {
      console.log("Error: setup a JWT_SECRET in ENV");
    }
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 30 * 6; // six months
    const token = await new SignJWT({
      data: {
        account_id,
      },
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(privateKey));
    return token;
  };
  