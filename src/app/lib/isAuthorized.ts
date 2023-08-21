import { jwtVerify } from "jose";

async function isAuthorized(token: string) {
  const privateKey = process.env["JWT_SECRET"] || "";  
  let result = null;
  try {
    result = await jwtVerify(token, new TextEncoder().encode(privateKey));
  } catch (error) {
    console.log("not authorized");
  }
  
  return result?.payload.data;
}

export default isAuthorized;
