import { myFetch } from "./fetch";
import * as jose from "jose";
import { createSecretKey } from "crypto";

export { myFetch };

export const isRetailer = (pathname: string): boolean => {
  return !!pathname.match(/retailer/) && !pathname.includes("login");
};

export const getLastPathSegment = (pathname: string): string | null => {
  const segments = pathname.split("/").filter((segment: string) => segment);
  return segments.length > 0 ? segments[segments.length - 1] : null;
};

export const getFirstPathSegment = (pathname: string): string => {
  const segments = pathname.split("/").filter((segment: string) => segment);
  return segments[0];
};

export const generateRandomHexColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215);
  const hexColor = randomColor.toString(16).padStart(6, "0");
  return `#${hexColor}`;
};

export const verifyJwt = async (
  token: string | undefined
): Promise<boolean | number> => {
  if (!token) return false;
  try {
    // @ts-ignore
    const d = await jose.jwtVerify(token, process.env.JWT_SECRET, {});
    const { id } = d.payload as { id: number };

    return id;
  } catch (err) {
    console.error(err);
    return false;
  }
};

// export const generateJwt = async () => {
//   const payload = {
//     id: 1,
//   };
//   // @ts-ignore
//   const sign = createSecretKey(Buffer.from(process.env.JWT_SECRET));
//   console.log(sign);
//   const jwt = await new jose.SignJWT(payload)
//     .setProtectedHeader({
//       // @ts-ignore
//       alg: process.env.JWT_ALG,
//       typ: "JWT",
//     })
//     .setIssuedAt()
//     .setExpirationTime("1d")
//     .sign(sign);

//   return jwt;
// };
