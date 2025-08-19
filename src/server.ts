import express from "express";
import "dotenv/config";
import router from "./router";
import { connectDB } from "./config/db";
import cors from "cors";
import { corsOptions } from "./config/cors";

const app = express();

//habilitar el body parser para recibir datos en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static folder uploadas
app.use("/uploads", express.static("uploads"));

connectDB();

app.use(cors(corsOptions));

router.get("/", (req, res) => {
  res.send("Hola");
});

app.use("/api", router);

export default app;
