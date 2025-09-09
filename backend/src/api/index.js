import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";
import chatRoutes from "../routes/chat.route.js";

import { connectDB } from "../lib/db.js";

const app = express();

// middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Debug endpoint
app.get("/api/debug", (req, res) => {
  res.json({ message: "API is alive" });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(process.cwd(), "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "dist", "index.html"));
  });
}

// ensure DB connection
connectDB();

// For Vercel deployment - export the app as default
export default app;

/////////////////
// for deployement on vercel
// import express from "express";
// import "dotenv/config";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// import authRoutes from "../routes/auth.route.js";
// import userRoutes from "../routes/user.route.js";
// import chatRoutes from "../routes/chat.route.js";
// import { connectDB } from "../lib/db.js";

// const app = express();

// // middleware
// app.use(cors({
//   origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
//   credentials: true,
// }));
// app.use(express.json());
// app.use(cookieParser());

// // routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.get("/api/debug", (req, res) => {
//   res.json({ message: "API is alive" });
// });


// // ensure DB connection
// connectDB();

// export default app; // Vercel requires default export
