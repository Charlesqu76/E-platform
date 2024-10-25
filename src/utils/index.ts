import { myFetch } from "./fetch";
import * as jose from "jose";
import { logout } from "@/fetch";

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

export const verifyJwt = async <T>(
  token: string | undefined
): Promise<T | null> => {
  if (!token) return null;
  try {
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, uint8Array, {});
    return payload as T;
  } catch (err) {
    console.error("verifyJwt", err);
    return null;
  }
};

export const parseCookies = (
  cookieString: string
): { [key: string]: string } => {
  const cookies: { [key: string]: string } = {};

  if (!cookieString) {
    return cookies;
  }

  cookieString.split(";").forEach((cookie) => {
    const [key, value] = cookie.split("=").map((part) => part.trim());

    if (key && value) {
      cookies[key] = decodeURIComponent(value);
    }
  });

  return cookies;
};

const deleteCookie = (cookieName: string): void => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const logOut = async (cookieName: string) => {
  if (document) {
    deleteCookie(cookieName);
    document.location.reload();
  }
};

export const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const pickRandomElement = (array: string[]): string => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const getGeo = () => {
  const geo = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "ACT", "NT"];
  return pickRandomElement(geo);
};

export const getDevice = () => {
  const device = ["PHONE", "LAPTOP"];
  return pickRandomElement(device);
};
