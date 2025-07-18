import express from "express";
import "dotenv/config";
import router from "./router";
import { connectDB } from "./config/db";

const app = express();

//habilitar el body parser para recibir datos en formato JSON
app.use(express.json());

connectDB();

router.get("/", (req, res) => {
  res.send("Hola");
});

app.use("/api", router);

export default app;
