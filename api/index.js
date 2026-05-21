import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import candidateRoutes from "../routes/candidateRoutes.js";
import noteRoutes from "../routes/noteRoutes.js";
import { connectDB } from "../config/db.js";

const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// DB middleware
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Logger
app.use((req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`,
  );
  next();
});

// Root Route
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

// Routes
app.use("/api/candidates", candidateRoutes);

app.use("/api/notes", noteRoutes);

// Health route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toLocaleString(),
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on:", PORT);
});

export default app;
