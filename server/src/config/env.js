import dotenv from "dotenv";
dotenv.config();

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  const required = ["MONGO_URI", "JWT_SECRET", "ADMIN_PASSWORD", "CLIENT_URL"];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }
}

export const env = {
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || "fallback-dev-secret",
  adminPassword: process.env.ADMIN_PASSWORD || "admin123",
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
};
