import { createContext } from "@lit/context";

export const contextKey = Symbol("contextKey");

export type IAuthService = {
  nombre?: string;
};

export const AuthServiceContext = createContext<IAuthService>(Symbol());
