import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

import { authRoutes } from "./routes/auth.js";
import { subscriptionRoutes } from "./routes/subscription.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(3001, () => {
      console.log(`Database connected successfully and server started on PORT: ${3001}`);
    });
  })
  .catch((error) => {
    console.log('Error while connecting to the database', error);
  });
