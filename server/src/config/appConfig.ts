import getEnv from "@/utils/getEnv";

const configEnv = {
  PORT: getEnv("PORT"),
  CLIENT_URL: getEnv("CLIENT_URL", "http://localhost:5173/"),
  MONGO_URI: getEnv("MONGO_URI", "mongodb://localhost:27017/OPTISHIP_360"),
  JWT_ACCESS_SECRET: getEnv("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
  JWT_ACCESS_EXPIRE_IN: getEnv("JWT_ACCESS_EXPIRE_IN"),
  JWT_REFRESH_EXPIRE_IN: getEnv("JWT_REFRESH_EXPIRE_IN", "15m"),
  NODE_ENV: getEnv("NODE_ENV", "development")
};

export default configEnv;
