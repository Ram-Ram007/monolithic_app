import express from "express";
import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
