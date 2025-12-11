import express from "express";
import helmet from "helmet";
import authRoutes from "@/routes/authentication.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// routes
app.use("/api/v1/auth", authRoutes);

export default app;
