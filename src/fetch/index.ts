import { myFetch } from "@/utils";

export const login = async (payload: { email: string; password: string }) => {
  const { data } = await myFetch.post("login", payload);
  return data;
};
