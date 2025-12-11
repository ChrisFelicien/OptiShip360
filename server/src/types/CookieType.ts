export type CookieOption = {
  secure: boolean;
  httpOnly: boolean;
  maxAge: number;
  sameSite?: boolean | "lax" | "strict" | undefined;
};
