import { myFetch } from "./fetch";

export { myFetch };

export const isRetailer = (pathname: string): boolean => {
  return !!pathname.match(/retailer/) && !pathname.includes("login");
};

export const getLastPathSegment = (pathname: string): string | null => {
  const segments = pathname
    .split("/")
    .filter((segment: string) => segment !== "");
  return segments.length > 0 ? segments[segments.length - 1] : null;
};

export const generateRandomHexColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215);
  const hexColor = randomColor.toString(16).padStart(6, "0");
  return `#${hexColor}`;
};
