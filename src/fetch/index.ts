import { myFetch } from "@/utils";

export const login = async (payload: { email: string; password: string }) => {
  const { data } = await myFetch.post("login", payload);
  return data;
};

export const getUserInfo = async (payload: { id: number }) => {
  const { data } = await myFetch.post("userinfo", payload);
  return data;
};
