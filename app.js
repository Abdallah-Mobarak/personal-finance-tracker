import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
// import transactionRoutes from "./routes/transaction.routes.js";
// import goalRoutes from "./routes/goal.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/goals", goalRoutes);

export default app;
