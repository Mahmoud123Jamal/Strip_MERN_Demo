import express from "express";
import cors from "cors";
import checkoutRoute from "./routes/checkoutRoute";
import product from "./routes/productRoute";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.use("/api", checkoutRoute);
app.use("/api", product);

export default app;
