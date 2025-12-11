import jwt from "jsonwebtoken";
import JwtPayload from "@/types/jwtPayload";
import configEnv from "@/config/appConfig";

export const createAccessToken = (user: JwtPayload): string => {
  return jwt.sign(
    { id: user.id, role: user.role },
    configEnv.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

export const createRefreshToken = (user: JwtPayload): string => {
  return jwt.sign({ id: user.id }, configEnv.JWT_REFRESH_SECRET, {
    expiresIn: "7d"
  });
};
