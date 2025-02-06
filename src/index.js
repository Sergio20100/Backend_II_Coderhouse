import express from "express";
import connectDB from "./config/database.js";
import sessionRouter from "./routes/session.routes.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/products.routes.js"

//settings
const app = express();
app.set("PORT", 3000);
// const uri = "mongodb://127.0.0.1:27017/policies";
const URI = "mongodb+srv://coderhouse:coderhouse@clusterproyectofinalbac.ov588.mongodb.net/?retryWrites=true&w=majority&appName=ClusterProyectoFinalBackend1/test_pre_entrega";
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.json({ title: "Home Page" });
});
app.use("/session", sessionRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
//listeners
connectDB(URI);
app.listen(app.get("PORT"), () => {
  console.log(`Server on port http://localhost:${app.get("PORT")}`);
});
