import { createContext } from "react";

export const UserContext = createContext<{ id: number | null }>({
  id: null,
});
