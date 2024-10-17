import { TUserInfo } from "@/type/user";
import { createContext } from "react";

export const UserContext = createContext<{
  userInfo: TUserInfo | null;
}>({
  userInfo: null,
});
