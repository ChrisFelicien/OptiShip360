import getEnv from "@/utils/getEnv";

const configEnv = {
  PORT: getEnv("PORT"),
  CLIENT_URL: getEnv("CLIENT_URL", "http://localhost:5173/"),
  MONGO_URI: getEnv("MONGO_URI", "mongodb://localhost:27017/OPTISHIP_360"),
  JWT_ACCESS_SECRET: getEnv("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
  JWT_ACCESS_EXPIRE_IN: getEnv("JWT_ACCESS_EXPIRE_IN"),
  JWT_REFRESH_EXPIRE_IN: getEnv("JWT_REFRESH_EXPIRE_IN", "15m"),
  NODE_ENV: getEnv("NODE_ENV", "development"),

  // mailer
  MAIL_HOST: getEnv("MAIL_HOST", "smtp.ethereal.email") as string,
  MAIL_PORT: getEnv("MAIL_PORT", "587"),
  MAIL_USER_EMAIL: getEnv("USER_EMAIL", "ova59@ethereal.email"),
  MAIL_PASSWORD: getEnv("MAIL_PASSWORD", "p4njXHKJr4X76BFcK3"),
  MAIL_USER_NAME: getEnv("MAIL_USER_NAME", "Team OPTISHIP 3060")
};

export default configEnv;
