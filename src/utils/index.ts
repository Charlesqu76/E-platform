export const isRetailer = (pathname: string): boolean => {
  return !!pathname.match(/retailer/) && !pathname.includes("login");
};

export const getLastPathSegment = (pathname: string): string | null => {
  const segments = pathname
    .split("/")
    .filter((segment: string) => segment !== "");
  return segments.length > 0 ? segments[segments.length - 1] : null;
};
