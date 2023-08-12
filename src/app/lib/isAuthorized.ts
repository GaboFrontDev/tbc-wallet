import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

async function isAuthorized(token: string, req: NextRequest) {
  const privateKey = process.env["JWT_SECRET"] || "";  
  let result = null;
  try {
    result = await jwtVerify(token, new TextEncoder().encode(privateKey));
  } catch (error) {
    console.log(error);
  }
  
  return result?.payload.data;
}

export default isAuthorized;
