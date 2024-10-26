import { myFetch } from "@/utils";

export const epLogin = async (payload: {
  email: string;
  password: string;
  p: string;
}) => {
  const { data } = await myFetch.post("login/ep", { ...payload });
  return data;
};

export const retailerLogin = async (payload: {
  email: string;
  password: string;
  p: string;
}) => {
  const { data } = await myFetch.post("login/retailer", { ...payload });
  return data;
};

export const logout = async () => {
  await myFetch.post("logout");
};

export const getUserInfo = async (payload: { id: number }) => {
  const { data } = await myFetch.post("userinfo", payload);
  return data;
};
