import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";

import initializePassport from "./config/passport.config.js";
import connectDB from "./config/database.js";
import sessionRouter from "./routes/session.routes.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/products.routes.js"
import cartRouter from "./routes/carts.routes.js";
import ticketRouter from "./routes/tickets.routes.js";
import env from "./config/env.js";
//settings
const app = express();
app.set("PORT", env.port);
// const uri = "mongodb://127.0.0.1:27017/policies";
// const db_name = "test";
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//passport
initializePassport();
app.use(passport.initialize());
//routes
app.get("/", (req, res) => {
  res.json({ title: "Home Page" });
});
app.use("/api/session", sessionRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/tickets", ticketRouter);
//listeners
connectDB(env.mongodb_url);
app.listen(app.get("PORT"), () => {
  console.log(`Server on port http://localhost:${env.port}`);
});
