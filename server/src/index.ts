import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const DB_URL = process.env.MONGO_URL;

import feedbackRouter from "./routes/feedback";
app.use("/feedback", feedbackRouter);

app.get("/", (req, res) => {
  res.send("Hello, World");
});

const PORT = process.env.PORT || 5000;

async function serve() {
  if (!DB_URL) {
    console.error("database URL not found");
    return;
  }
  try {
    await mongoose.connect(DB_URL);
    console.log("connected to mongoDB");
    app.listen(PORT);
    console.log(`server is running on port ${PORT}`);
  } catch (error) {
    console.log("error connecting to mongoDB");
  }
}

serve();
