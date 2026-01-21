import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import postRoute from "./routes/postRoute.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is running successfully ?🚀");
});
app.use("/api", postRoute);
app.use("/uploads", express.static("uploads"));


const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

 mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    })
     .catch((error) => console.log("MongoDB connection error:", error));