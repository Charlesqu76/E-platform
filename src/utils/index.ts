import { AUTH_COOKID } from "@/const";
import { myFetch } from "./fetch";
import * as jose from "jose";
import Cookies from "js-cookie";

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
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, uint8Array, {});
    const { id } = payload as { id: number };
    return id;
  } catch (err) {
    console.error("verifyJwt", err);
    return false;
  }
};

export const LogOut = () => {
  Cookies.remove(AUTH_COOKID);
  location.reload();
};
