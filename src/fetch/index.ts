import { myFetch } from "@/utils";

export const login = async (payload: {
  email: string;
  password: string;
  p: string;
}) => {
  const { data } = await myFetch.post("login", { ...payload, p: "/" });
  return data;
};

export const logout = async () => {
  await myFetch.post("logout");
};

export const getUserInfo = async (payload: { id: number }) => {
  const { data } = await myFetch.post("userinfo", payload);
  return data;
};
