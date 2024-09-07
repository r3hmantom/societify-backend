import express from "expres";
import express from "express";
import mongoose from "mongoose";

const app = express();

require('dotenv').config();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
// Add your routes and middleware here

export default app;
