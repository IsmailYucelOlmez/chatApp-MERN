import express from "express";
import authRoutes from "./routes/auth.route";
import dotenv from "dotenv";
import Database from "./lib/db";

dotenv.config();

const db = Database.getInstance();

const app=express();

app.use(express.json());

app.use("/api/v1/auth",authRoutes);

db.connect(process.env.MONGO_DB_URI as string);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});