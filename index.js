import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import postsRouter from "./routes/posts.js";

const app = express();
const PORT = process.env.PORT || 5000;

//connnect to mongodb
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error)); //let us know if there's error
db.once("open", () => console.log("connected to Database"));

//middlewares and routes
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/api/posts", postsRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
